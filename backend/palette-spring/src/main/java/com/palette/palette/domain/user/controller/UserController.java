package com.palette.palette.domain.user.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.user.dto.login.LoginReqDto;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import com.palette.palette.domain.user.dto.update.PasswordUpdateReqDto;
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

    @Operation(summary = "이메일 중복체크")
    @GetMapping("/idcheck")
    public BaseResponse idcheck(@RequestParam String email){
        return BaseResponse.success(userService.emailValidation(email));
    }

    @Operation(summary = "닉네임 중복체크")
    @GetMapping("/nicknamecheck")
    public BaseResponse nicknamecheck(@RequestParam String nickname){
        return BaseResponse.success(userService.nicknameValidation(nickname));
    }

    @Operation(summary = "비밀번호 수정")
    @PutMapping("/password")
    public BaseResponse passwordUpdate(@RequestBody @Valid PasswordUpdateReqDto password, HttpServletRequest request){
        System.out.println("비밀번호 수정 요청");
        return BaseResponse.success(userService.passwordUpdate(password, request));
    }



}
