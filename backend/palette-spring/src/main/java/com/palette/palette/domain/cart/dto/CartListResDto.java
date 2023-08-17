package com.palette.palette.domain.cart.dto;

import com.palette.palette.domain.cart.entity.Cart;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartListResDto {

    private Long id;

    private Integer price;

    private Integer count;

    private List<CartItemDto> cartItemDtoList;

    public static CartListResDto toDto(Cart cart, List<CartItemDto> cartItemDtoList){

        return CartListResDto.builder()
                .id(cart.getId())
                .price(cart.getPrice())
                .count(cart.getCount())
                .cartItemDtoList(cartItemDtoList)
                .build();
    }
}
