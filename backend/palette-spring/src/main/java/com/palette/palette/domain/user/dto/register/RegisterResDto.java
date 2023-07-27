package com.palette.palette.domain.user.dto.register;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterResDto {

    @Schema(description = "회원 가입 성공 여부", example = "true")
    Boolean check;
}
