package com.palette.palette.domain.follow.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FollowCntDto {

    @Schema(description = "팔로워 수", example = "10")
    private String followerCnt;

    @Schema(description = "팔로잉 수", example = "10")
    private String followingCnt;
}
