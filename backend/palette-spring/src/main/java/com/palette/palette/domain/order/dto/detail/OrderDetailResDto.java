package com.palette.palette.domain.order.dto.detail;


import com.palette.palette.domain.delivery.dto.DeliveryResDto;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.order.entity.OrderStatus;
import com.palette.palette.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResDto {

    private Long id;

    private BaseUserResDto user;

    private Integer price;

    private Integer count;

    private String requirement;

    private OrderStatus orderStatus;

    private LocalDateTime orderAt;

    private DeliveryResDto delivery;


    public static OrderDetailResDto toDto(Order order) {

        return OrderDetailResDto.builder()
                .id(order.getId())
                .user(BaseUserResDto.toDto(order.getUser()))
                .price(order.getPrice())
                .count(order.getCount())
                .requirement(order.getRequirement())
                .orderStatus(order.getOrderStatus())
                .orderAt(order.getOrderAt())
                .delivery(DeliveryResDto.toDto(order.getDelivery()))
                .build();
    }
}
