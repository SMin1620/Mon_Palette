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
public class PersonalUpdateReqDto {

    @Schema(description = "퍼스널 컬러 수정", example = "가을")
    private String personalColor;
}
