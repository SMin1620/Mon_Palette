package com.palette.palette.domain.search.dto;


import com.palette.palette.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchAutoResDto {

    private Long id;

    private String email;

    private String nickname;

    private String profileImage;

    public static SearchAutoResDto toDto(User user) {

        return SearchAutoResDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .build();
    }

}
