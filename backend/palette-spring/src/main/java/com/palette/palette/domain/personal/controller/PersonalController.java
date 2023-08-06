package com.palette.palette.domain.personal.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.personal.dto.PersonalColorUserDto;
import com.palette.palette.domain.personal.service.PersonalColorService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/personal")
@Slf4j
@Tag(name = "퍼스널컬러 API")
public class PersonalController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final PersonalColorService personalColorService;


    @Operation(summary = "퍼스널컬러 결과 유저 반영")
    @PutMapping()
    public BaseResponse personalColorUser(
            HttpServletRequest request,
            @RequestBody PersonalColorUserDto personalColorUserDto
    ) {
        System.out.println("퍼스널컬러 결과 유저 반영 컨트롤러");

        try {
            /////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            personalColorService.personalColor(personalColorUserDto, user);

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("퍼스널컬러 결과 유저 반영 실패");
        }
    }
}
