package com.palette.palette.domain.itemDetailPhoto.dto;

import com.palette.palette.domain.itemDetailPhoto.entity.ItemDetailPhoto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDetailPhotoDto {

    private Long id;

    private String itemImage;

    public static ItemDetailPhotoDto toDto(ItemDetailPhoto itemDetailPhoto){
        return ItemDetailPhotoDto.builder()
                .id(itemDetailPhoto.getId())
                .itemImage(itemDetailPhoto.getItemDetailImage())
                .build();
    }
}
