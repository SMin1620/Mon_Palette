package com.palette.palette.domain.itemPhoto.dto;

import com.palette.palette.domain.itemPhoto.entity.ItemPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemPhotoDto {

    private Long id;

    private String itemImage;

    public static ItemPhotoDto toDto(ItemPhoto itemPhoto){
        return ItemPhotoDto.builder()
                .id(itemPhoto.getId())
                .itemImage(itemPhoto.getItemImage())
                .build();
    }
}
