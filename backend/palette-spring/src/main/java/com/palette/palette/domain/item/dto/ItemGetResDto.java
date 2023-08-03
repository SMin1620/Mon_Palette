package com.palette.palette.domain.item.dto;

import com.palette.palette.domain.item.entity.Item;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemGetResDto {

    @Schema(description = "아이템 이름", example = "립서비스")
    private String name;

    @Schema(description = "썸네일", example = "썸네일.url")
    private String thumbnail;

    @Schema(description = "가격", example = "1000")
    private Integer price;

    @Schema(description = "할인율", example = "10%")
    private Integer discount;

    @Schema(description = "시작일", example = "10.7")
    private LocalDateTime createAt;

    @Schema(description = "종료 일", example = "10.8")
    private LocalDateTime endAt;

    /**
     * entity -> dto
     */
    public static ItemGetResDto toDto(Item item){
        return ItemGetResDto.builder()
                .name(item.getName())
                .thumbnail(item.getThumbnail())
                .price(item.getPrice())
                .discount(item.getDiscount())
                .createAt(item.getCreateAt())
                .endAt(item.getEndAt())
                .build();
    }


}
