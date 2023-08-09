package com.palette.palette.domain.cart.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemOptionDto {

    @Schema(description = "아이템 옵션 id", example = "1604")
    private Long itemOptionId;

    @Schema(description = "아이템 옵션에 따른 갯수", example = "1")
    private int count;
}
