package com.palette.palette.domain.user.dto.validation;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidationResDto {

    @Schema(description = "email or nickname 중복 체크", example = "true")
    Boolean check;
}
