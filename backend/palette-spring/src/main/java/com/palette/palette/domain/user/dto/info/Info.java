package com.palette.palette.domain.user.dto.info;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Info {

    @Schema(description = "배경화면", example = "배경화면url")
    private String background;

    @Schema(description = "프로필 사진", example = "프로필 사진 url")
    private String profilePhoto;

    @Schema(description = "닉네임", example = "존잘")
    private String nickname;

    @Schema(description = "퍼스널컬러", example = "가을")
    private String personalcolr;

    @Schema(description = "휴대폰 번호", example = "010-7777-7777")
    private String phone;

    @Schema(description = "주소", example = "사랑시 행복구 고백동")
    private String address;
}
