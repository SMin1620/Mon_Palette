package com.palette.palette.domain.user.dto.validation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PhoneReqDto {

    @NotEmpty(message = "휴대폰은 필수 입력입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
    @Schema(description = "휴대폰", example = "00000000000")
    private String phone;
}
