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
public class ProfileUpdateReqDto {

    @Schema(description = "프로필사진 변경", example = "프로필이미지.jpg")
    private String profileImage;
}
