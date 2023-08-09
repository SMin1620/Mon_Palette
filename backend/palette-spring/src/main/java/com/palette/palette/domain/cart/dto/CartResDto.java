package com.palette.palette.domain.cart.dto;

import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResDto {

    @Schema(description = "아이템", example = "아이템")
    private Item item;

    @Schema(description = "아이템 옵션 리스트", example = "아이템 옵션 리스트")
    List<CartItemOptionDto> cartItemOptionDtoList;

}
