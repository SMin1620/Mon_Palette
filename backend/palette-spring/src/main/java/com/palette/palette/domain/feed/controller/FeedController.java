package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.service.FeedService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    /**
     * 피드 수정
     */
    @Operation(summary = "피드 수정")
    @PutMapping("/{id}")
    public BaseResponse feedUpdate(
            @RequestParam("feedId") Long feedId,
            @RequestBody FeedReqDto request
    ) {

        // 사용자 유효성 검사 진행해야함.


        FeedReqDto feedReqDto = FeedReqDto.builder()
                .content(request.getContent())
                .tagContent(request.getTagContent())
                .feedImages(request.getFeedImages())
                .build();

        // DB에 저장되어 있는 파일 가져오기
        List<FeedImageResDto> feedImages = feedService.findAllByFeed(feedId);

        return BaseResponse.success(feedService.feedUpdate(feedReqDto, feedImages, feedId));
    }
}
