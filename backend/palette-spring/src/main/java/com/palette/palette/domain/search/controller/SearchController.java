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
import org.springframework.web.bind.annotation.*;

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
    @Operation(summary = "검색 QueryDSL")
    @GetMapping()
    public BaseResponse feedSearch(
            @RequestParam("page") int page,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "keyword", required = false) String content,
            @RequestParam(value = "orderBy", required = false) String orderBy,
            @RequestParam(value = "color", required = false) String color,
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

//            if (type.equals("feed")) {
//                return BaseResponse.success(searchService.feedSearch(page, 10, content, orderBy, color, user.getId()));
//            }
//            else if (type.equals("challenge")) {
//                return BaseResponse.success(searchService.challengeSearch(page, 10, content, orderBy, color, user.getId()));
//            }
//            return BaseResponse.success(searchService.feedSearch(page, 10, content, orderBy, color, user.getId()));
            return BaseResponse.success(searchService.search(page, 10, type, content, orderBy, color, user.getId()));
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("검색 실패");
        }
    }


    /**
     * 인기 검색어 10위 까지의 목록 조회
     */
    @Operation(summary = "인기검색어 목록 조회")
    @GetMapping("/ranking")
    public BaseResponse rankList(
            HttpServletRequest request
    ) {
        System.out.println("인기 검색어 목록 조회 컨트롤러");

        try {
            return BaseResponse.success(searchService.rankList());
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("인기 검색어 목록 조회 실패");
        }
    }


    /**
     * 최근 검색어 목록 조회
     */
    @Operation(summary = "최근 검색어 목록 조회")
    @GetMapping("/recent")
    public BaseResponse recentList(
            HttpServletRequest request
    ) {
        System.out.println("최근 검색어 목록 조회 컨트롤러");

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

            return BaseResponse.success(searchService.recentList(user.getId()));
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("최근 검색어 목록 조회 실패");
        }
    }


    /**
     * 최근 검색어 삭제
     */
    @Operation(summary = "최근 검색어 삭제")
    @DeleteMapping("/recent")
    public BaseResponse deleteRecent(
            @RequestBody String keyword,
            HttpServletRequest request
    ) {
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

            searchService.removeRecentKeyword(user.getId(), keyword);

            return BaseResponse.success(true);
        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("최근 검색어 삭제 실패");
        }

    }
}
