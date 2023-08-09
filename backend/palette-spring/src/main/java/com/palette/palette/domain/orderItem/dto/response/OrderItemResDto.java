package com.palette.palette.domain.orderItem.dto.response;

import com.palette.palette.domain.orderItem.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResDto {

    private Long itemId;

    private Long itemOptionId;

    private String itemOptionName;

    private Integer stock;


    public static OrderItemResDto toDto(OrderItem orderItem) {

        return OrderItemResDto.builder()
                .itemId(orderItem.getId())
                .itemOptionId(orderItem.getItemOption().getId())
                .itemOptionName(orderItem.getItemOption().getOptionName())
                .stock(orderItem.getOrderCount())
                .build();
    }
}
