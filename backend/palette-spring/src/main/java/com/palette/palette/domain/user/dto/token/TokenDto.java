package com.palette.palette.domain.user.dto.token;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TokenDto {

    private String accessToken;
    private String refreshToken;
}
