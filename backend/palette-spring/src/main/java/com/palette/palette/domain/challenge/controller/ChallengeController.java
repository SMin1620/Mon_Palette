package com.palette.palette.domain.challenge.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.service.ChallengeService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.domain.user.service.UserService;
import com.palette.palette.jwt.JwtTokenProvider;
import io.jsonwebtoken.Jwt;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;

import java.nio.file.attribute.UserPrincipalNotFoundException;


@Tag(name = "챌린지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
@Slf4j
public class ChallengeController {

    private final ChallengeService challengeService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 챌린지 목록 조회
     * @param page
     */
    @Operation(summary = "챌린지 목록 조회")
    @GetMapping()
    public BaseResponse challengeList(
            @RequestParam("page") int page,
            HttpServletRequest request
    ) {
        try {

            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(challengeService.list(page, 10));
        } catch (Exception e) {
            return BaseResponse.error("챌린지 목록 조회 실패");
        }
    }

    /**
     * 챌린지 생성
     */
//    @Operation(summary = "챌린지 생성")
//    @PostMapping()
//    public BaseResponse challangeCreate(
//            @RequestBody ChallengeCreateReqDto request,
//            Authentication authentication
//            ) {
//        System.out.println("챌린지 생성 컨트롤러");
//
//        try {
//            // 인가된 사용자 정보
//            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//
//            System.out.println("Controller userDetails >>> " + userDetails);
//            User user = userRepository.findByEmail(userDetails.getUsername()).get();
//            System.out.println("Controller user >>> " + user);
//
//            // 유저 예외처리 :: 예외처리 커스텀 필요
//            if (user == null) {
//                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
//            }
//
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return BaseResponse.error("error");
//        }
//    }
}
