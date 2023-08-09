package com.palette.palette.domain.cart.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartListResDto {

    private Integer price;

    private Integer count;

    private List<CartResDto> cartResDtoList;

    private Integer deliveryFee;
}
