package com.palette.palette.domain.user.dto;

import com.palette.palette.domain.user.entity.Role;
import com.palette.palette.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String email;
    private String name;
    private Role role;
    private String nickname;
    private String personalColor;
    private String profileImage;
    private String backgroundImage;

    /**
     * entity -> dto
     */
    public static UserDto toDto(User user){
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .role(user.getRole())
                .nickname(user.getNickname())
                .personalColor(user.getPersonalColor())
                .profileImage(user.getProfileImage())
                .backgroundImage(user.getBackgroundImage())
                .build();
    }

}
