package com.palette.palette.domain.user.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.user.dto.login.LoginReqDto;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import com.palette.palette.domain.user.dto.update.*;
import com.palette.palette.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Getter;
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

    /**
     * 예외처리
     */
    @Operation(summary = "비밀번호 수정")
    @PutMapping("/password")
    public BaseResponse passwordUpdate(@RequestBody @Valid PasswordUpdateReqDto password, HttpServletRequest request){
        System.out.println("비밀번호 수정 요청");
        return BaseResponse.success(userService.passwordUpdate(password, request));
    }

    @Operation(summary = "닉네임 수정")
    @PutMapping("/nickname")
    public BaseResponse nicknameUpdate(@RequestBody @Valid NicknameUpdateReqDto nickname, HttpServletRequest request){
        return BaseResponse.success(userService.nicknameUpdate(nickname, request));
    }

    @Operation(summary = "퍼스널 컬러 수정")
    @PutMapping("/personal")
    public BaseResponse personalUpdate(@RequestBody @Valid PersonalUpdateReqDto personal, HttpServletRequest request){
        return BaseResponse.success(userService.personalColorUpdate(personal, request));
    }

    @Operation(summary = "배경사진 수정")
    @PutMapping("/background")
    public BaseResponse backgroundUpdate(@RequestBody @Valid BackgroundUpdateReqDto background, HttpServletRequest request){
        return BaseResponse.success(userService.backgroundUpdate(background, request));
    }

    @Operation(summary = "프로필 사진 수정")
    @PutMapping("/profile")
    public BaseResponse profileUpdate(@RequestBody @Valid ProfileUpdateReqDto profile, HttpServletRequest request){
        return BaseResponse.success(userService.profileUpdate(profile,request));
    }

    @Operation(summary = "휴대폰번호 수정")
    @PutMapping("/phone")
    public BaseResponse phoneUpdate(@RequestBody @Valid PhoneUpdateReqDto phone, HttpServletRequest request){
        return BaseResponse.success(userService.phoneUpdate(phone, request));
    }

    @Operation(summary = "개인정보 수정 페이지")
    @GetMapping("/info")
    public BaseResponse Info(HttpServletRequest request){
        System.out.println(userService.userInfo(request));
        return BaseResponse.success(userService.userInfo(request));
    }

    @Operation(summary = "마이페이지")
    @GetMapping("/mypage")
    public BaseResponse mypage(HttpServletRequest request){
        return BaseResponse.success(userService.mypage(request));
    }


}
