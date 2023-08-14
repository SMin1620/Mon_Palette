package com.palette.palette.domain.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItemDto {
    private Long itemId;

    private List<CartItemOptionDto> itemOptionDtoList;
}
