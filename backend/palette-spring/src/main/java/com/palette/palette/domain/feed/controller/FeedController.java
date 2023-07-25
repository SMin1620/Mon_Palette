package com.palette.palette.domain.feed.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.repository.FeedRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "피드 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/feed")
public class FeedController {

    private final FeedRepository feedRepository;


    /**
     * 피드 목록 조회
     */
    @Operation(summary = "피드 목록 조회")
    @GetMapping
    public BaseResponse FeedList() {

        return BaseResponse.success(feedRepository.findAll());
    }
}
