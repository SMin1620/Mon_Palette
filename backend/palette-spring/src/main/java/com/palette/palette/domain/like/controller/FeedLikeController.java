package com.palette.palette.domain.like.controller;


import com.fasterxml.jackson.databind.ser.Serializers;
import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.service.FeedService;
import com.palette.palette.domain.like.service.FeedLikeService;
import com.palette.palette.domain.user.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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


    @Operation(summary = "좋아요 추가")
    @PostMapping("/{id}/like")
    public BaseResponse feedLike(
            @RequestParam("feedId") Long feedId,
            Authentication authentication
    ) {
        try {
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

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
            @RequestParam("feedId") Long feedId,
            Authentication authentication
    ) {
        try {

            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

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
            Authentication authentication
    ) {
        try {
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(feedLikeService.feedLikeList(feedId));
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("좋아요 목록 조회 실패");
        }
    }

}
