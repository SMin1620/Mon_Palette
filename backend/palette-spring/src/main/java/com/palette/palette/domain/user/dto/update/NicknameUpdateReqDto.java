package com.palette.palette.domain.user.dto.update;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NicknameUpdateReqDto {

    private String nickname;
}
