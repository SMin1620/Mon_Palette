package com.palette.palette.domain.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CompletePaymentDto {

    private Long id;

    private String paymentId;

    private String txId;


}
