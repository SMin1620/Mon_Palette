package com.palette.palette.domain.orderItem.dto;

import com.palette.palette.domain.itemOption.entity.ItemOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemOptionDto {

    private Long itemOptionId;

    private Integer itemOptionCount;
}
