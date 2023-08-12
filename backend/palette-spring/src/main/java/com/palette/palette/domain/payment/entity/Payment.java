package com.palette.palette.domain.payment.entity;


import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "payments")
@Tag(name = "결제 API")
public class Payment {

    @Id @GeneratedValue
    @Column(name = "pay_id")
    private Long id;

    @NotNull
    private String UUID;

    @NotNull
    private String impUid;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentStatus payStatus;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PaymentMethod payMethod;

    @NotNull
    private int price;

    private int remainPrice;
}
