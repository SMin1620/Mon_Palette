package com.palette.palette.domain.like.controller;


import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.like.service.ChallengeLikeService;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api/challenge")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "챌린지 좋아요 API")
public class ChallengeLikeController {

    private final UserRepository userRepository;
    private final ChallengeLikeService challengeLikeService;
    private final JwtTokenProvider jwtTokenProvider;


    @Operation(summary = "챌린지 좋아요 추가")
    @PostMapping("/{id}/like")
    public BaseResponse challengeLike(
            @PathVariable("id") Long challengeId,
            HttpServletRequest request
    ) {
        System.out.println("챌린지 좋아요 추가 컨트롤러");

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

            // 좋아요 비즈니스 로직
            challengeLikeService.like(challengeId, currentUserId);

            return BaseResponse.success(true);
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 실패");
        }
    }

    @Operation(summary = "챌린지 좋아요 취소")
    @DeleteMapping("/{id}/like")
    public BaseResponse challengeUnLike(
            @PathVariable("id") Long challengeId,
            HttpServletRequest request
    ) {
        System.out.println("챌린지 좋아요 취소 컨트롤러");

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

            challengeLikeService.unLike(challengeId, currentUserId);

            return BaseResponse.success(true);
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 취소 실패");
        }
    }
}
