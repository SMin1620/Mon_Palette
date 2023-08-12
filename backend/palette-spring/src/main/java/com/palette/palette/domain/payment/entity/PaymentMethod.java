package com.palette.palette.domain.payment.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Getter;

import java.util.stream.Stream;

@Getter
public enum PaymentMethod {

    CARD("카드"), KAKAO("카카오 페이"),
    NAVER("네이버 페이"), PAYCO("페이코"),
    MOBILE("휴대폰 결제"), TOSS("토스 페이"), KGINICIS("KG 이니시스");

    private String method;

    PaymentMethod(String method) {
        this.method = method;
    }

    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    public static PaymentMethod findByMethod(String method) throws Exception {
        return Stream.of(PaymentMethod.values())
                .filter(c -> c.name().equals(method))
                .findFirst()
                .orElseThrow(() -> new Exception("결제 에러"));
    }
}
