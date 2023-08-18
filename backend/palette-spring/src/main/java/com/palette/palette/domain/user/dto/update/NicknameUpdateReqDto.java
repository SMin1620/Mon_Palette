package com.palette.palette.domain.user.dto.update;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NicknameUpdateReqDto {

    @NotEmpty(message = "닉네임을 입력해주세요.")
    @Schema(description = "닉네임 수정", example = "짱아")
    private String nickname;
}
