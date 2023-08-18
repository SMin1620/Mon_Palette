package com.palette.palette.domain.user.dto.validation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmailReqDto {

    @NotEmpty(message = "이메일은 필수 입력입니다.")
    @Pattern(regexp = "(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    @Schema(description = "회원 이메일", example = "email@email.com")
    String email;
}
