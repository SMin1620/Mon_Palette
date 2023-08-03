package com.palette.palette.domain.order.dto.create;

import com.palette.palette.domain.order.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderReqDto {

    private List<OrderItemReqDto> orderItems;

    private String requirement;

    private Integer count;

    private Integer price;

}
