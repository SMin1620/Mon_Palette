package com.palette.palette.domain.item.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemReqDto {

    @Schema(description = "상품 이름", example = "상품 이름")
    private String itemaName;

    @Schema(description = "가격", example = "10000")
    private int price;


}
