package com.palette.palette.domain.makeup.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.makeup.dto.makeup.MakeUpReqDto;
import com.palette.palette.domain.makeup.service.MakeUpService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api/color/makeup")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "메이크업 API")
public class MakeUpController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final MakeUpService makeUpService;


    @Operation(summary = "메이크업 샘플 데이터 목록 조회")
    @GetMapping("")
    public BaseResponse imageList(
            HttpServletRequest request
    ) {
        System.out.println("메이크업 샘플 데이텀 목록 조회 컨트롤러");

        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(makeUpService.list(user));


        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("메이크업 샘플 데이텀 목록 조회 실패");
        }
    }


    @Operation(summary = "메이크업 이미지 업로드")
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse imageUpload(
            HttpServletRequest request,
            MakeUpReqDto makeUpReqDto
    ) {
        System.out.println("메이크업 이미지 업로드 컨트롤러");

        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }


            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("메이크업 이미지 업로드 실패");
        }
    }
}
