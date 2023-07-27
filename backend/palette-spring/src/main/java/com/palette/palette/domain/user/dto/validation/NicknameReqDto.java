package com.palette.palette.domain.user.dto.validation;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NicknameReqDto {

    @NotEmpty(message = "닉네임는 필수 입력입니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    @Schema(description = "닉네임", example = "짱구")
    String nickname;
}
