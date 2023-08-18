package com.palette.palette.domain.user.dto.update;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackgroundUpdateReqDto {

    @Schema(description = "배경 사진 수정", example = "imgurl")
    private String backgroundImage;
}
