package com.palette.palette.domain.payment.entity;

import lombok.Getter;

@Getter
public enum PaymentStatus {

    CANCEL("결제 취소"), COMPLETE("결제 완료"), WAITING("결제 대기");

    private String status;

    PaymentStatus(String status) {
        this.status = status;
    }

}
