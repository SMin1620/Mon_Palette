package com.palette.palette.domain.order.dto.list;


import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.order.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderListResDto {

    private Long id;

    private Integer price;

    private Integer count;

    private String requirement;

    private OrderStatus orderStatus;

    private LocalDateTime orderAt;


    /**
     * entity -> dto
     */
    public static OrderListResDto toDto(Order order) {

        return OrderListResDto.builder()
                .id(order.getId())
                .price(order.getPrice())
                .count(order.getCount())
                .requirement(order.getRequirement())
                .orderAt(order.getOrderAt())
                .orderStatus(order.getOrderStatus())
                .build();
    }

}
