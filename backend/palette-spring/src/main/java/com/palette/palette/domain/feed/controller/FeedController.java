package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.service.FeedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

        System.out.println("피드 생성 로직");
        return BaseResponse.success(feedService.feedCreate(feedReqDto, feedReqDto.getFeedImages()));
    }

    /**
     * 피드 상세 조회
     */
    @Operation(summary = "피드 상세 조회")
    @GetMapping("/{id}")
    public BaseResponse feedDetail(
            @RequestParam("feedId") Long feedId) {

        System.out.println("피드 상세 조회 로직");
        return BaseResponse.success(feedService.feedDetail(feedId));
    }
}
