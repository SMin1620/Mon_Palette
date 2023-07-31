package com.palette.palette.domain.challenge.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.challenge.service.ChallengeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@Tag(name = "챌린지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
@Slf4j
public class ChallengeController {

    private final ChallengeService challengeService;


    @Operation(summary = "챌린지 목록 조회")
    @GetMapping()
    public BaseResponse challengeList(
            @RequestParam("page") int page
    ) {
        return BaseResponse.success(challengeService.list(page, 10));
    }
}
