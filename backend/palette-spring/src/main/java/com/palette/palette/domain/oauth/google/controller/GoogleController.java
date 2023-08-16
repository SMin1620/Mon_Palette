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

import java.io.IOException;

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
            , HttpServletRequest request
    ) {
        try{
            TokenDto tokenDto = googleService.socialLogin(response, code, registrationId);
            Cookie cookie = new Cookie("accessToken", tokenDto.getAccessToken());
            Cookie cookie1 = new Cookie("refreshToken", tokenDto.getRefreshToken());
            Cookie cookie2 = new Cookie("userId", tokenDto.getUserId().toString());
            cookie.setPath("https://mon-palette.shop/home");
            cookie.setHttpOnly(true);
            cookie1.setPath("https://mon-palette.shop/home");
            cookie1.setHttpOnly(true);
            cookie2.setPath("https://mon-palette.shop/home");
            cookie2.setHttpOnly(true);
            response.sendRedirect("https://mon-palette.shop/home");
            return BaseResponse.success(tokenDto);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("OAUTH로그인에 실패하였습니다.");
        }

    }

}
