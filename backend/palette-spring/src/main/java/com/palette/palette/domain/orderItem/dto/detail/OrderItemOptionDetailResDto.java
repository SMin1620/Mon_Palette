package com.palette.palette.domain.orderItem.dto.detail;

import com.palette.palette.domain.itemOption.entity.ItemOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemOptionDetailResDto {

    private Long itemOptionId;

    private String optionName;

    private Integer orderCount;

    private Integer orderPrice;

    public static OrderItemOptionDetailResDto toDto(ItemOption itemOption) {
        return OrderItemOptionDetailResDto.builder()
                .itemOptionId(itemOption.getId())
                .optionName(itemOption.getOptionName())
                .build();

    }
}
