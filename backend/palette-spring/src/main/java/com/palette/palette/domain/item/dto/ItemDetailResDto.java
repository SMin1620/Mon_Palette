package com.palette.palette.domain.item.dto;

import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemDetailPhoto.dto.ItemDetailPhotoDto;
import com.palette.palette.domain.itemOption.dto.ItemOptionDto;
import com.palette.palette.domain.itemPhoto.dto.ItemPhotoDto;
import com.palette.palette.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemDetailResDto {

    private Long id;

    private String name;

    private Integer price;

    private Integer discount;

    private String content;

    private String manufact;

    private Integer deliveryFee;

    private String thumbnail;

    private Integer maximum;

    private LocalDateTime createAt;

    private LocalDateTime endAt;

    private UserDto user;

    private List<ItemOptionDto> itemOptionDtoList;

    private List<ItemPhotoDto> itemPhotoDtoList;

    private List<ItemDetailPhotoDto> itemDetailPhotoDtoList;

    public static ItemDetailResDto toDto(Item item
            , UserDto userDto
            , List<ItemOptionDto> itemOptionDtoList
            , List<ItemPhotoDto> itemPhotoDtoList
            , List<ItemDetailPhotoDto> itemDetailPhotoDtoList){
        return ItemDetailResDto.builder()
                .id(item.getId())
                .name(item.getName())
                .price(item.getPrice())
                .discount(item.getDiscount())
                .content(item.getContent())
                .manufact(item.getManufact())
                .deliveryFee(item.getDeliveryFee())
                .thumbnail(item.getThumbnail())
                .maximum(item.getMaximum())
                .createAt(item.getCreateAt())
                .endAt(item.getEndAt())
                .user(userDto)
                .itemOptionDtoList(itemOptionDtoList)
                .itemPhotoDtoList(itemPhotoDtoList)
                .itemDetailPhotoDtoList(itemDetailPhotoDtoList)
                .build();
    }

}
