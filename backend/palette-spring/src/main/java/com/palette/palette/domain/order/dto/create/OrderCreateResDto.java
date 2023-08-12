package com.palette.palette.domain.order.dto.create;

import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.payment.entity.Payment;
import com.palette.palette.domain.payment.entity.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateResDto {

    private String name;

    private Integer totalPrice;

    private PaymentMethod paymentMethod;

    public static OrderCreateResDto toDto(Payment payment) {
        return OrderCreateResDto.builder()
                .name(payment.getName())
                .totalPrice(payment.getPrice())
                .paymentMethod(payment.getPaymentMethod())
                .build();
    }
}

