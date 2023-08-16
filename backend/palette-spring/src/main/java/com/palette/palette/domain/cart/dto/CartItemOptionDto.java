package com.palette.palette.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItemOptionDto {

    private Long itemOptionId;

    private Long itemOptionDetailId;

    private String itemOptionName;

    private Integer stock;

    private Integer itemOptionCount;
}
