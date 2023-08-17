package com.palette.palette.domain.cart.dto;

import com.palette.palette.domain.cart.entity.CartItemOption;
import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartItemDto {

    private Long cartItemId;

    private Long itemId;

    private String name;

    private Integer price;

    private Integer discount;

    private String manufact;

    private Integer deliveryFee;

    private String thumbnail;

    private Integer maximum;

    private List<CartItemOptionDto> itemOptionDtoList;
}
