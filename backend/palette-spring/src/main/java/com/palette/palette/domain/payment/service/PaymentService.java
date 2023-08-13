package com.palette.palette.domain.payment.service;

import com.palette.palette.domain.order.dto.create.OrderCreateReqDto;
import com.palette.palette.domain.payment.entity.Payment;
import com.palette.palette.domain.payment.entity.PaymentMethod;
import com.palette.palette.domain.payment.entity.PaymentStatus;
import com.palette.palette.domain.payment.repository.PaymentRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.sun.jdi.InternalException;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.webjars.NotFoundException;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.ZoneId;
import java.util.Objects;
import java.util.Optional;

import static lombok.Lombok.checkNotNull;

@Service
@RequiredArgsConstructor
//@ConfigurationProperties(prefix = "pgmodule")
@Transactional(readOnly = true)
@Slf4j
public class PaymentService {

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;

    @Value("${pgmodule.app-id}")
    private String apiKey;
    @Value("${pgmodule.secret-key}")
    private String apiSecret;


    /**
     * 결제 확인 검증 로직 :: 첫번째
     */
    @Transactional
    public Payment verifyPayment(String receiptId, Long orderId, User buyer) {

        checkNotNull(receiptId, "receiptId must be provided.");

        Optional<Payment> optionalPayment = paymentRepository.findByOrderIdAndBuyer(orderId, buyer);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            payment.setReceiptId(receiptId);
            return verifyPayment(payment, buyer);
        }
        else {
            throw new NotFoundException("Could not found payment for " + orderId + ".");
        }

    }


    /**
     * 결제 확인 검증 로직 :: 두번째
     */
    @Transactional
    public Payment verifyPayment(Payment payment, User buyer) {

        checkNotNull(payment, "payment must be provided.");
        checkNotNull(buyer, "buyer must be provided.");

        if (!payment.getBuyer().equals(buyer)) {
            throw new NotFoundException("Could not found payment for " + buyer.getName() + ".");
        }

        IamportClient iamportClient = new IamportClient(apiKey, apiSecret);

        try {

            IamportResponse<com.siot.IamportRestClient.response.Payment> paymentResponse = iamportClient.paymentByImpUid(payment.getReceiptId());

            if (Objects.nonNull(paymentResponse.getResponse())) {
                com.siot.IamportRestClient.response.Payment paymentData = paymentResponse.getResponse();

                if (payment.getReceiptId().equals(paymentData.getImpUid())
                        && String.valueOf(payment.getOrder().getId()).equals(paymentData.getMerchantUid())
                        && new BigDecimal(payment.getPrice()).compareTo(paymentData.getAmount()) == 0) {

                    PaymentMethod method = PaymentMethod.valueOf(paymentData.getPayMethod().toUpperCase());
                    PaymentStatus status = PaymentStatus.valueOf(paymentData.getStatus().toUpperCase());
                    payment.setPaymentMethod(method);
                    payment.setStatus(status);
                    paymentRepository.save(payment);

                    if (status.equals(PaymentStatus.PAID)) {
                        payment.setPaidAt(paymentData.getPaidAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
                        paymentRepository.save(payment);
                    } else if (status.equals(PaymentStatus.FAILED)) {
                        throw new InternalException("Payment failed.");
                    } else if (status.equals(PaymentStatus.CANCELLED)) {
                        throw new InternalException("This is a cancelled payment.");
                    }
                }
                else {
                    throw new IllegalArgumentException("The amount paid and the amount to be paid do not match.");
                }
            }
            else {
                throw new NotFoundException("Could not found payment for " + payment.getReceiptId() + ".");
            }

        } catch (IamportResponseException e) {

            e.printStackTrace();
            switch (e.getHttpStatusCode()) {
                case 401 -> throw new InternalException("Authentication token not passed or invalid.");
                case 404 -> throw new NotFoundException("Could not found payment for " + payment.getReceiptId() + ".");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return payment;
    }

}
