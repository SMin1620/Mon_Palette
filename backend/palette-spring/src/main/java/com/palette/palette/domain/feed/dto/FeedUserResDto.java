package com.palette.palette.domain.feed.dto;

import com.palette.palette.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedUserResDto {

    private Long id;

    private String email;

    private String name;

    private String nickname;

    private String personalColor;

    private String profileImage;

    private String backgroundImage;

    public static FeedUserResDto toDto(User user) {
        return FeedUserResDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .personalColor(user.getPersonalColor())
                .profileImage(user.getProfileImage())
                .backgroundImage(user.getBackgroundImage())
                .build();
    }
}
