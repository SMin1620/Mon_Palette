package com.palette.palette.domain.orderItem.dto.detail;

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
public class OrderItemDetailResDto {

    private Long itemId;

    private String itemName;

    private String thumbnail;

    private Integer orderPrice;

    private Integer orderCount;

    private List<OrderItemOptionDetailResDto> orderItemOptions;
}
