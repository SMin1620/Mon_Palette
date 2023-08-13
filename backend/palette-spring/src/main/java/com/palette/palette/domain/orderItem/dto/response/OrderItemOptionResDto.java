package com.palette.palette.domain.orderItem.dto.response;


import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.orderItem.entity.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemOptionResDto {

    private Long itemOptionId;

    private String optionName;

    private Integer stock;


    public static OrderItemOptionResDto toDto(ItemOption itemOption) {
        return OrderItemOptionResDto.builder()
                .itemOptionId(itemOption.getId())
                .optionName(itemOption.getOptionName())
                .stock(itemOption.getStock())
                .build();
    }
}
