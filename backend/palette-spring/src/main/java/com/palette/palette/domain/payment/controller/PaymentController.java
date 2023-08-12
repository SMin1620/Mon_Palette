//package com.palette.palette.domain.payment.controller;
//
//import com.palette.palette.common.BaseResponse;
//import com.palette.palette.domain.challenge.service.ChallengeService;
//import com.siot.IamportRestClient.IamportClient;
//import com.siot.IamportRestClient.exception.IamportResponseException;
//import com.siot.IamportRestClient.response.IamportResponse;
//import com.siot.IamportRestClient.response.Payment;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpSession;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.io.IOException;
//
//@RestController
//@RequestMapping("/api/payment")
//@RequiredArgsConstructor
//@Slf4j
//public class PaymentController {
//
//    private final IamportClient iamportClient;
//
//
//
//    //생성자를 통해 REST API 와 REST API secret 입력
//
//
//    /**
//     * 포트원을 통해 결제가 이루어졌다면, 결제후 검증을 위하여 서버 검증 파트로 필요한 정보들을 전송하고 여기서 받는다.
//     */
//    //iamport를 이용하여 결제하기를 버튼을 눌렀을때 작동
//    @PostMapping("/verifyIamport/{imp_uid}")
//    public IamportResponse<Payment> paymentByImpUid(@PathVariable String imp_uid, HttpServletRequest request) throws IamportResponseException, IOException {
//        log.info("paymentByImpUid 진입");
//        IamportResponse<Payment> paymentIamportResponse = iamportClient.paymentByImpUid(imp_uid);
//        Payment payment = paymentIamportResponse.getResponse();
//        HttpSession session = request.getSession(false); //로그인이 된 사용자가 세션을 사용하고 있으므로 false 세팅을 해준것임
//        session.setAttribute("payment",payment);
//        return paymentIamportResponse;
//    }
//
//}
