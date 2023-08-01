package com.palette.palette.domain.search.controller;


import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.search.service.SearchService;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@Tag(name = "검색 API")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/search")
public class SearchController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final SearchService searchService;


    /**
     * QueryDsl 을 이용한 검색 동적 쿼리
     */
    @Operation(summary = "피드 검색 QueryDSL")
    @GetMapping("/search")
    public BaseResponse feedSearch(
            @RequestParam("page") int page,
            @RequestParam("type") String type,
            @RequestParam("content") String content,
            HttpServletRequest request
    ) {

        System.out.println("검색 기능 컨트롤러");

        try {
            //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
            String token = jwtTokenProvider.resolveToken(request);
            jwtTokenProvider.validateToken(token);

            System.out.println("token >>> " + token);

            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            User user = userRepository.findByEmail(userDetails.getUsername()).get();

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (user == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            if (type.equals("feed")) {
                return BaseResponse.success(searchService.feedSearch(page, 10, content));
            }
            else if (type.equals("challenge")) {
//                return BaseResponse.success(searchService.challengeSearch(page, 10, content));
            }
            return BaseResponse.success(searchService.feedSearch(page, 10, content));
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("검색 실패");
        }
    }
}
