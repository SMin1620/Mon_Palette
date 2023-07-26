package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.service.FeedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Tag(name = "피드 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedService feedService;


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
            @RequestBody FeedReqDto feedReqDto) {

        System.out.println("피드 생성 컨트롤러");
        return BaseResponse.success(feedService.feedCreate(feedReqDto, feedReqDto.getFeedImages()));
    }

    /**
     * 피드 상세 조회
     */
    @Operation(summary = "피드 상세 조회")
    @GetMapping("/{id}")
    public BaseResponse feedDetail(
            @RequestParam("feedId") Long feedId) {

        System.out.println("피드 상세 조회 컨트롤러");
        return BaseResponse.success(feedService.feedDetail(feedId));
    }

    /**
     * 피드 수정
     */
    @Operation(summary = "피드 수정")
    @PutMapping("/{id}")
    public BaseResponse feedUpdate(
            @RequestParam("feedId") Long feedId,
            @RequestBody @Valid FeedReqDto request
    ) {

        System.out.println("피드 수정 컨트롤러");

        // 사용자가 인증된 상태인지,
        // 요청자가 작성자가 맞는지 검증하는 로직이 필요.


        FeedReqDto feedReqDto = FeedReqDto.builder()
                .content(request.getContent())
                .tagContent(request.getTagContent())
                .build();




        return BaseResponse.success(feedService.feedUpdate(feedId, feedReqDto));
    }
}
