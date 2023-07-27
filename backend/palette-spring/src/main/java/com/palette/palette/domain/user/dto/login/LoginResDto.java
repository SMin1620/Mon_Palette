package com.palette.palette.domain.user.dto.login;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginResDto {
    @Schema(description = "로그인 성공 여부", example = "true")
    Boolean check;
}
