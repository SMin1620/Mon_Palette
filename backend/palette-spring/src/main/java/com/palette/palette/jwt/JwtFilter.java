package com.palette.palette.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.redis.RedisConnectionFailureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 헤더(Authorization) 에 있는 토큰을 꺼내 이상이 없는 경우 SecurityContext에 저장
 * Request 이전에 작동
 * */
public class JwtFilter extends OncePerRequestFilter {
    private final JwtTokenProvider jwtTokenProvider;

    public JwtFilter(JwtTokenProvider jwtTokenProvider){
        this.jwtTokenProvider = jwtTokenProvider;
    }

    /**
     * doFilterInternal 함수 오버라이드
     * 필터링 로직 수행
     * request header에서 token을 꺼내고 유효성 검사 후 유저 정보를 꺼내 Security Context 에 저장
     * SecurityConfig 에 인증을 설정한 API에 대한 request 요청은 모두 이 필터를 거치기 때문에 토큰 정보가 없거나
     * 유효하지 않은 경우 정상적으로 수행되지 않음
     */

    @Override
    protected  void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException{
        String token = jwtTokenProvider.resolveToken(request);
        System.out.println("doFilter >>> " + token);
        try{
            if(token != null && jwtTokenProvider.validateToken(token)){
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }catch (RedisConnectionFailureException e){
            e.printStackTrace();
            SecurityContextHolder.clearContext();
//            throw new IllegalArgumentException("레디스 잘못 됨");
//            throw new BaseException(REDIS_ERROR);
            return;
        }catch (Exception e){
            e.printStackTrace();
//            throw new BaseException(INVALID_JWT);
//            throw new IllegalArgumentException("토큰 잘못 됨");
            return;
        }
        filterChain.doFilter(request, response);
    }

}
