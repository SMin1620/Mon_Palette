package com.palette.palette.domain.user.dto.mypage;

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
public class Mypage {

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
    private long followerCnt;

    @Schema(description = "팔로잉수", example = "9")
    private long followingCnt;

    @Schema(description = "피드 수", example = "10")
    private long feedCnt;

    @Schema(description = "피드", example = "피드 리스트")
    private List<Feed> feed;

}
