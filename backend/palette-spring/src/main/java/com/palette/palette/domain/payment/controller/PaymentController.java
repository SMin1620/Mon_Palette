package com.palette.palette.domain.payment.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.order.dto.create.OrderCreateReqDto;
import com.palette.palette.domain.payment.dto.VerifyPaymentDto;
import com.palette.palette.domain.payment.entity.Payment;
import com.palette.palette.domain.payment.service.PaymentService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.yaml.snakeyaml.tokens.ScalarToken;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment")
@Tag(name = "결제 API")
public class PaymentController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PaymentService paymentService;


    @Operation(summary = "결제 확인")
    @PutMapping("/{orderId}")
    public BaseResponse verifyPayment(
            HttpServletRequest request,
            @PathVariable("orderId") Long orderId,
            @Valid @RequestBody VerifyPaymentDto verifyPaymentDto
            ) {
        System.out.println("결제 확인 컨트롤러");

        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            Payment payment = paymentService.verifyPayment(verifyPaymentDto.getReceiptId(), orderId, user);

            return BaseResponse.success(payment);

        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("결제 확인 도중에서 실패");
        }
    }

}
