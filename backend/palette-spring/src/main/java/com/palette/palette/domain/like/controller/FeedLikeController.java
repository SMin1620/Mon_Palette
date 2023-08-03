package com.palette.palette.domain.like.controller;


import com.fasterxml.jackson.databind.ser.Serializers;
import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.service.FeedService;
import com.palette.palette.domain.like.service.FeedLikeService;
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
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "피드 좋아요 API")
public class FeedLikeController {

    private final UserRepository userRepository;
    private final FeedService feedService;
    private final FeedLikeService feedLikeService;
    private final JwtTokenProvider jwtTokenProvider;


    @Operation(summary = "좋아요 추가")
    @PostMapping("/{id}/like")
    public BaseResponse feedLike(
            @PathVariable("id") Long feedId,
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

            // 좋아요 비즈니스 로직
            feedLikeService.feedLike(feedId, currentUserId);


            return BaseResponse.success(true);
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 실패");
        }
    }


    @Operation(summary = "좋아요 취소")
    @DeleteMapping("/{id}/like")
    public BaseResponse feedUnLike(
            @PathVariable("id") Long feedId,
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


            // 좋아요 취소 비즈니스 로직
            feedLikeService.feedUnlike(feedId, currentUserId);


            return BaseResponse.success(true);
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 취소 실패");
        }
    }

    @Operation(summary = "좋아요 목록 조회")
    @GetMapping("/{id}/like")
    public BaseResponse feedLikeList(
            @RequestParam("feedId") Long feedId,
            HttpServletRequest request
    ) {
        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("request >>> " + request);
            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user.getId() == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(feedLikeService.feedLikeList(feedId, user));
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 목록 조회 실패");
        }
    }

}
