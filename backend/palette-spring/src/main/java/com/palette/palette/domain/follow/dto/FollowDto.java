package com.palette.palette.domain.follow.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FollowDto {

    @Schema(description = "내가 팔로우를 당하는거", example = "이메일")
    private String toUser;
    @Schema(description = "내가 팔로우 하는거", example = "이메일")
    private String fromUser;
}
