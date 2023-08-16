package com.palette.palette.domain.makeup.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.makeup.service.MakeUpService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.InputStream;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Base64;

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


    /**
     * 메이크업 샘플 이미지 리스트
     */


    /**
     * 이미지 url 엔드포인트 테스트
     */
    @Operation(summary = "이미지 url 엔드포인트 테스트")
    @PostMapping(value = "/send/django", produces = MediaType.APPLICATION_JSON_VALUE)
    public BaseResponse djangoImage(
    ) {

        System.out.println("장고로 이미지 url 엔드포인트로 보내는 테스트 컨트롤러");

        try {
            // 이미지 리소스를 가져옴
            Resource resource = new ClassPathResource("media/봄웜1.png");
            InputStream inputStream = resource.getInputStream();

            // 이미지 데이터를 Base64로 인코딩
            byte[] imageBytes = inputStream.readAllBytes();
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);

            // 이미지 데이터를 BaseResponse에 담아서 반환
            return BaseResponse.success(base64Image);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("Failed to send image to Django");
        }
    }
}
