package com.palette.palette.domain.category.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryCreateReq {

    @Schema(description = "카테고리 명", example = "립스틱")
    private String name;

    @Schema(description = "카테고리 사진", example = "립스틱.jpg")
    private String categoryPhoto;

    @Schema(description = "부모 카테고리 id", example = "0")
    private Long parentId;
}
