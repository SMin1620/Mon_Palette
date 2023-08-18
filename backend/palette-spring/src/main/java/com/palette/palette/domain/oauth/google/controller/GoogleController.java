package com.palette.palette.domain.oauth.google.controller;

import ch.qos.logback.core.model.Model;
import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.oauth.google.service.GoogleService;
import com.palette.palette.domain.user.dto.token.TokenDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping(value = "/api/login/oauth2", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "OAUTH2.0 API")
public class GoogleController {

    private final GoogleService googleService;

    @GetMapping("/code/{registrationId}")
    public BaseResponse googleLogin(HttpServletResponse response
            , @RequestParam("code") String code
            , @PathVariable("registrationId") String registrationId
    ) {
        try{
            TokenDto tokenDto = googleService.socialLogin(response, code, registrationId);
            response.sendRedirect(UriComponentsBuilder.fromUriString("https://mon-palette.shop/oauthredirect")
                    .queryParam("accessToken", "Bearer "+tokenDto.getAccessToken())
                    .queryParam("refreshToken", "Bearer " + tokenDto.getRefreshToken())
                    .queryParam("userId", tokenDto.getUserId())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString());
            return BaseResponse.success(tokenDto);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("OAUTH로그인에 실패하였습니다.");
        }

    }

}