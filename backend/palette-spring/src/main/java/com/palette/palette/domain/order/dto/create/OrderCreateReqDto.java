package com.palette.palette.domain.order.dto.create;

import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.order.entity.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderCreateReqDto {

    private List<OrderItemDto> items;

    private BaseUserResDto user;

    private OrderAddressDto address;

    private String requirement;

    private Integer totalCount;

    private Integer totalPrice;

    private OrderStatus orderStatus;

}
