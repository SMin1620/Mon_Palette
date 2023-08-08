package com.palette.palette.domain.item.dto;

import com.palette.palette.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemUpdateReqDto {

    @Schema(description = "이름 수정", example = "수정한 이름")
    private String name;

    @Schema(description = "가격 수정", example = "8282")
    private Integer price = 0;

    @Schema(description = "할인율 수정", example = "10")
    private Integer discount = 0;

    @Schema(description = "상품 내용 수정", example = "좋아용")
    private String content;

    @Schema(description = "제조사 수정", example = "나이키")
    private String manufact;

    @Schema(description = "배달비 수정", example = "500000")
    private Integer deliveryFee;

    @Schema(description = "썸네일 수정", example = "희희.jpg")
    private String thumbnail;

    @Schema(description = "상품 살 수 있는 수량 수정", example = "123")
    private Integer maximum = 0;
    
    @Schema(description = "시작일 수정", example = "오늘")
    private LocalDateTime createAt;

    @Schema(description = "종료일 수정", example = "내일")
    private LocalDateTime endAt;

}
