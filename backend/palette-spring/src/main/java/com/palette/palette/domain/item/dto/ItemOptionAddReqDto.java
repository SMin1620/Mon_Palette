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
public class ItemOptionAddReqDto {

    @Schema(description = "옵션 이릅", example = "주황색")
    private String optionName;

    @Schema(description = "재고 수량", example = "5")
    private Integer stock;
}
