package com.palette.palette.domain.user.dto.userpage;

import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.Role;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPage {

    @Schema(description = "나인지 아닌지", example = "true")
    private Boolean isMe;

    @Schema(description = "팔로우 여부", example = "true")
    private Boolean isFollow;

    @Schema(description = "이메일", example = "이메일")
    private String email;

    @Schema(description = "프로필 사진", example = "프로필사진url")
    private String profilePhoto;

    @Schema(description = "배경 사진", example = "배경사진url")
    private String background;

    @Schema(description = "닉네임", example = "닉네임")
    private String nickname;

    @Schema(description = "인플루언서 여부", example = "User")
    private Role isInfluence;

    @Schema(description = "퍼스널컬러", example = "가울")
    private String personalColor;

    @Schema(description = "팔로워수", example = "8")
    private String followerCnt;

    @Schema(description = "팔로잉수", example = "9")
    private String followingCnt;

    @Schema(description = "피드 수", example = "10")
    private Integer feedCnt;

    @Schema(description = "피드", example = "피드 리스트")
    private List<FeedResDto> feed;
    @Schema(description = "소셜 로그인 여부", example = "true")
    private Boolean isOauth;

}
