package com.palette.palette.domain.like.dto.list;

import com.palette.palette.domain.user.entity.User;
import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class FeedLikeUserResDto {

    private Long id;

    private String nickname;

    private String personalColor;

    private String profileImage;

    private String backgroundImage;

    public static FeedLikeUserResDto toDto(User user) {
        return FeedLikeUserResDto.builder()
                .id(user.getId())
                .nickname(user.getNickname())
                .personalColor(user.getPersonalColor())
                .profileImage(user.getProfileImage())
                .backgroundImage(user.getBackgroundImage())
                .build();
    }
}
