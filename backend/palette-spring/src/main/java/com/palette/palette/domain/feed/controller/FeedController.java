package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.detail.FeedDetailResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.feed.service.FeedService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.PrincipalDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@Tag(name = "피드 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;


    /**
     * 피드 목록 조회
     */
    @Operation(summary = "피드 목록 조회")
    @GetMapping()
    public BaseResponse feedList(
            @RequestParam("page") int page) {

        // page -> 0 시작 , size -> 가져올 피드 10개
        return BaseResponse.success(feedService.feedList(page, 10));
    }

    /**
     * 피드 생성
     * ++ 유저 넣어야 함.
     */
    @Operation(summary = "피드 생성")
    @PostMapping()
    public BaseResponse feedCreate(
            @RequestBody FeedReqDto feedReqDto,
            Authentication authentication
    ) throws UserPrincipalNotFoundException {
        System.out.println("피드 생성 로직");

        try {
            // 인가된 사용자 정보
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            System.out.println("Controller userDetails >>> " + userDetails);
            User user = userRepository.findByEmail(userDetails.getUsername()).get();
            System.out.println("Controller user >>> " + user);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(feedService.feedCreate(feedReqDto, feedReqDto.getFeedImages(), user));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 생성 실패");
        }
    }

    /**
     * 피드 상세 조회
     */
    @Operation(summary = "피드 상세 조회")
    @GetMapping("/{id}")
    public BaseResponse feedDetail(
            @RequestParam("feedId") Long feedId
    ) {
        System.out.println("피드 상세 조회 로직");

        try {
            FeedDetailResDto feedDetail = feedService.feedDetail(feedId);
            return BaseResponse.success(feedDetail);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 상세 조회 실패");
        }
    }

    /**
     * 피드 수정
     */
    @Operation(summary = "피드 수정")
    @PutMapping("/{id}")
    public BaseResponse feedUpdate(
            @RequestParam("feedId") Long feedId,
            @RequestBody FeedReqDto request,
            Authentication authentication
    ) {
        try {
            // 피드 작성자가 본인인지 확인하는 로직
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 게시글 작성자의 이메일 가져옴
            Long feedUserId = feedService.getFeedUserId(feedId);

            System.out.println("feedUserId >>> " + feedUserId);

            // 작성자와 현재 유저가 일치한지 처리하는 로직
            if (! currentUserId.equals(feedUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            // 데이터의 수정
            FeedReqDto feedReqDto = FeedReqDto.builder()
                    .content(request.getContent())
                    .tagContent(request.getTagContent())
                    .feedImages(request.getFeedImages())
                    .build();

            // DB에 저장되어 있는 파일 가져오기
            List<FeedImageResDto> feedImages = feedService.findAllByFeed(feedId);

            return BaseResponse.success(feedService.feedUpdate(feedReqDto, feedImages, feedId));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 수정 실패");
        }
    }

    /**
     * 피드 삭제
     */
    @Operation(summary = "피드 삭제")
    @DeleteMapping("/{id}")
    public BaseResponse feedDelete(
            @RequestParam("feedId") Long feedId,
            Authentication authentication
    ) {
        try {
            feedService.feedDelete(feedId);

            // 피드 작성자가 본인인지 확인하는 로직
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 게시글 작성자의 이메일 가져옴
            Long feedUserId = feedService.getFeedUserId(feedId);

            System.out.println("feedUserId >>> " + feedUserId);

            // 작성자와 현재 유저가 일치한지 처리하는 로직
            if (! currentUserId.equals(feedUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 삭제 실패");
        }
    }
}
