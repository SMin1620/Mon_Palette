package com.palette.palette.domain.user.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.user.dto.login.LoginReqDto;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import com.palette.palette.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Tag(name = "회원 API")
public class UserController {

    private final UserService userService;

    @Operation(summary = "회원 가입")
    @PostMapping("/signup")
    public BaseResponse signup(
            @RequestBody @Valid RegisterReqDto request
            ){
        return BaseResponse.success(userService.signup(request));
    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public BaseResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody @Valid LoginReqDto loginReqDto
            ){
        return BaseResponse.success(userService.login(response, loginReqDto));
    }

    @Operation(summary = "엑세스 토큰 재발급")
    @PostMapping("/refresh")
    public BaseResponse refresh(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestHeader("Authorization") String authorizationHeader
    ){
        System.out.println("재발급 로직 시작");
        System.out.println(authorizationHeader);
        return BaseResponse.success(userService.refresh(request, response, authorizationHeader));
    }


}
