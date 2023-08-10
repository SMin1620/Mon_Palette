package com.palette.palette.domain.order.dto.detail;


import com.palette.palette.domain.delivery.dto.DeliveryResDto;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.order.entity.OrderStatus;
import com.palette.palette.domain.orderItem.dto.detail.OrderItemDetailResDto;
import com.palette.palette.domain.orderItem.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    private List<OrderItemDetailResDto> items;  // 아이템 리스트 -> 아이템 옵션 리스트

    private DeliveryResDto delivery;

}
