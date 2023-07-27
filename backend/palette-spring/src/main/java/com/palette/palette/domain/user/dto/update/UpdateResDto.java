package com.palette.palette.domain.user.dto.update;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateResDto {

    @Schema(description = "업데이트 성공 여부", example = "true")
    private boolean update;
}
