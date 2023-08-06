package com.palette.palette.domain.itemOption.dto;


import com.palette.palette.domain.itemOption.entity.ItemOption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemOptionDto {

    private Long id;

    private String optionName;

    private Integer stock;

    public static ItemOptionDto toDto(ItemOption itemOption){
        return ItemOptionDto.builder()
                .id(itemOption.getId())
                .optionName(itemOption.getOptionName())
                .stock(itemOption.getStock())
                .build();
    }
}
