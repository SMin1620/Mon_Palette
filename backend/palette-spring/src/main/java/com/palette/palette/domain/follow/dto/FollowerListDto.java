package com.palette.palette.domain.follow.dto;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.Role;
import com.palette.palette.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowerListDto {

    @Schema(description = "아이디", example = "아이디")
    private Long id;

    @Schema(description = "이메일", example = "이메일")
    private String email;

    @Schema(description = "역할", example = "인플루언서")
    private Role role;

    @Schema(description = "닉네임", example = "짱구")
    private String nickname;

    @Schema(description = "퍼스널컬러", example = "가을")
    private String personalColor;

    @Schema(description = "프로필 사진", example = "프로필 사진 경로")
    private String profileImage;

    @Schema(description = "배경사진", example = "배경 사진 경로")
    private String backgroundImage;
    @Schema(description = "나인지 아닌지", example = "true")
    private Boolean isMe;
    @Schema(description = "팔로우", example = "팔로우")
    private String isFollow;

    public static FollowerListDto toDto(User user, Boolean isme, String isfollow) {
        return FollowerListDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole())
                .nickname(user.getNickname())
                .personalColor(user.getPersonalColor())
                .profileImage(user.getProfileImage())
                .backgroundImage(user.getBackgroundImage())
                .isMe(isme)
                .isFollow(isfollow)
                .build();
    }

}
