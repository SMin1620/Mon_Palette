package com.palette.palette.domain.item.dto;

import com.palette.palette.domain.itemOption.entity.ItemOption;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemAddReqDto {

    @Schema(description = "상품 이름", example = "상품 이름")
    private String itemName;

    @Schema(description = "가격", example = "10000")
    private Integer price;

    private Integer discount;

    private String content;

    private String manufact;

    private Integer deliveryFee;

    private String thumbnail;

    private Integer maximum;

    private LocalDateTime createAt;

    private LocalDateTime endAt;

    /**
     * 상품 옵션
     */

    private List<ItemOptionAddReqDto> itemOptionList;

    /**
     * 상품설명 이미지
     */

    private List<String> itemDetailImageList;

    /**
     * 상품 이미지
     */
    private List<String> itemPhotoList;

    /**
     * 카테고리
     */
    private String categoryName;
    private String categoryPhoto;
    private Long categoryParentId = 1L;
}
