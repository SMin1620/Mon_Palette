package com.palette.palette.jwt;

import org.springframework.web.filter.OncePerRequestFilter;

/**
 * 헤더(Authorization) 에 있는 토큰을 꺼내 이상이 없는 경우 SecurityContext에 저장
 * Request 이전에 작동
 * */
public class JwtFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

}
