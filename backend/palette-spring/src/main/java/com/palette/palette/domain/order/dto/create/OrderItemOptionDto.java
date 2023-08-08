package com.palette.palette.domain.order.dto.create;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemOptionDto {

    private Long itemOptionId;

//    private String itemOptionName;

    private Integer itemOptionCount;

    private Integer itemOptionPrice;
}
