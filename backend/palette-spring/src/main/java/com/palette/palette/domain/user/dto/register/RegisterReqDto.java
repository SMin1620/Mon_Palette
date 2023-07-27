package com.palette.palette.domain.user.dto.register;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RegisterReqDto {

    @NotEmpty(message = "이메일은 필수 입력입니다.")
    @Pattern(regexp = "(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
    @Schema(description = "회원 이메일", example = "email@email.com")
    String email;

    @NotEmpty(message = "비밀번호는 필수 입력입니다.")
    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{6,20}", message = "비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
    @Schema(description = "회원 비밀번호", example = "qwe123@")
    String password;

    @NotEmpty(message = "이름은 필수 입력입니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "이름은 특수문자를 제외한 2~10자리여야 합니다.")
    @Schema(description = "회원 이름", example = "짱구")
    String name;

    @NotEmpty(message = "생일은 필수 입력입니다.")
    @Schema(description = "생일", example = "970830")
    String birth;

    @NotEmpty(message = "휴대폰은 필수 입력입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])[.-]?(\\d{3}|\\d{4})[.-]?(\\d{4})$", message = "10 ~ 11 자리의 숫자만 입력 가능합니다.")
    @Schema(description = "휴대폰", example = "")
    String phone;

    @NotEmpty(message = "성별은 필수 입력입니다.")
    @Schema(description = "성별", example = "")
    String gender;

    @NotEmpty(message = "닉네임는 필수 입력입니다.")
    @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
    @Schema(description = "닉네임", example = "짱구")
    String nickname;
}
