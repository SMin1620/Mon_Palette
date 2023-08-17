package com.palette.palette.domain.cart.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartAddReqDto {

//    @Schema(description = "옵션 id, 객수", example = "{itemOptionId=1, count=1}")
    private List<CartItemDto> cartItemDtoList;
}
