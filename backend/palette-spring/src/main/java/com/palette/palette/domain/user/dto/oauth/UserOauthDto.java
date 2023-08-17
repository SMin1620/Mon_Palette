package com.palette.palette.domain.user.dto.oauth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserOauthDto {

    private String email;
    private String name;
    private String profileImage;
    private String backgroundImage;
}
