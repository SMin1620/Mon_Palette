package com.palette.palette.domain.user.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.user.dto.login.LoginReqDto;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import com.palette.palette.domain.user.dto.update.*;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
        try{
            return BaseResponse.success(userService.signup(request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("회원가입 실패");
        }

    }

    @Operation(summary = "로그인")
    @PostMapping("/login")
    public BaseResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody @Valid LoginReqDto loginReqDto
            ){
        try{
            return BaseResponse.success(userService.login(response, loginReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("로그인 실패");
        }

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
        try {
            return BaseResponse.success(userService.refresh(request, response, authorizationHeader));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("엑세스 토큰 재발급 실패");
        }

    }

    @Operation(summary = "이메일 중복체크")
    @GetMapping("/idcheck")
    public BaseResponse idcheck(@RequestParam String email){
        try{
            return BaseResponse.success(userService.emailValidation(email));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("이메일 중복체크 실패");
        }

    }

    @Operation(summary = "닉네임 중복체크")
    @GetMapping("/nicknamecheck")
    public BaseResponse nicknamecheck(@RequestParam String nickname){
        try {
            return BaseResponse.success(userService.nicknameValidation(nickname));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("닉네임 중복체크 실패");
        }
    }

    @Operation(summary = "휴대폰 중복체크")
    @GetMapping("/phonecheck")
    public BaseResponse phonecheck(@RequestParam String phone){
        try {
            return BaseResponse.success(userService.phoneValidation(phone));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("휴대폰 중복체크 실패");
        }

    }

    /**
     * 예외처리
     */
    @Operation(summary = "비밀번호 수정")
    @PutMapping("/password")
    public BaseResponse passwordUpdate(@RequestBody @Valid PasswordUpdateReqDto password, HttpServletRequest request){
        System.out.println("비밀번호 수정 요청");
        try{
            return BaseResponse.success(userService.passwordUpdate(password, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("비밀번호 수정 실패");
        }
    }

    @Operation(summary = "닉네임 수정")
    @PutMapping("/nickname")
    public BaseResponse nicknameUpdate(@RequestBody @Valid NicknameUpdateReqDto nickname, HttpServletRequest request){
        try{
            return BaseResponse.success(userService.nicknameUpdate(nickname, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("닉네임 수정 실패");
        }
    }

    @Operation(summary = "퍼스널 컬러 수정")
    @PutMapping("/personal")
    public BaseResponse personalUpdate(@RequestBody @Valid PersonalUpdateReqDto personal, HttpServletRequest request){
        try {
            return BaseResponse.success(userService.personalColorUpdate(personal, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("퍼스널 컬러 수정 실패");
        }
    }

    @Operation(summary = "배경사진 수정")
    @PutMapping("/background")
    public BaseResponse backgroundUpdate(@RequestBody @Valid BackgroundUpdateReqDto backgroundImage, HttpServletRequest request){
        System.out.println("background" + backgroundImage);
        try {
            return BaseResponse.success(userService.backgroundUpdate(backgroundImage, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("배경사진 수정 실패");
        }
    }

    @Operation(summary = "프로필 사진 수정")
    @PutMapping("/profile")
    public BaseResponse profileUpdate(@RequestBody @Valid ProfileUpdateReqDto profile, HttpServletRequest request){
        try{
            return BaseResponse.success(userService.profileUpdate(profile,request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("프로필 사진 수정 실패");
        }
    }

    @Operation(summary = "휴대폰번호 수정")
    @PutMapping("/phone")
    public BaseResponse phoneUpdate(@RequestBody @Valid PhoneUpdateReqDto phone, HttpServletRequest request){
        try{
            return BaseResponse.success(userService.phoneUpdate(phone, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("휴대폰번호 수정 실패");
        }
    }

    @Operation(summary = "주소지 수정")
    @PutMapping("/address")
    public BaseResponse addressUpdate(@RequestBody @Valid AddressUpdateReqDto address, HttpServletRequest request){
        try{
            return BaseResponse.success(userService.addressUpdate(address, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("주소지 수정 실패");
        }
    }


    @Operation(summary = "개인정보 수정 페이지")
    @GetMapping("/info")
    public BaseResponse Info(HttpServletRequest request){
        System.out.println(userService.userInfo(request));
        try{
            return BaseResponse.success(userService.userInfo(request));
        }catch (Exception e){
            e.printStackTrace();
            return  BaseResponse.error("개인정보 수정 페이지 불러오기 실패");
        }
    }

    @Operation(summary = "유저페이지")
    @GetMapping("/userpage/{id}")
    public BaseResponse userPage(HttpServletRequest request, @PathVariable("id") Long userId){
        System.out.println("유저페이지 조회 컨트롤러");
        try{
            return BaseResponse.success(userService.userPage(request, userId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("유저페이지 불러오기 실패");
        }
    }

    @GetMapping("/if")
    public ResponseEntity ifTest() {
        return ResponseEntity.ok().body("ok");
    }

    @Operation(summary = "회원탈퇴")
    @DeleteMapping()
    public BaseResponse deleteUser(HttpServletRequest request){
        try{
            userService.deleteUser(request);
            return BaseResponse.success(true);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("회워탈퇴 실패");
        }



    }
    @Operation(summary = "등업 요청")
    @PutMapping("/upgrade")
    public BaseResponse upgradeUser(HttpServletRequest request){
        try{
            return BaseResponse.success(userService.upgradeUser(request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("등업 요청 실패");
        }
    }

}
