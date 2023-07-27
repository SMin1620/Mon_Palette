package com.palette.palette.jwt;


import io.jsonwebtoken.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.net.http.HttpResponse;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtTokenProvider {

    /**
     * JwtTokenProvider : 유저 정보로 jwt access/refresh 토큰 생성 및 재발급 + 토큰으로부터 유저 정보 받기
     * */

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("Authorization")
    private String jwtHeader;

    @Value("1209600")
    private long accessExpirationTime;

    private final long JWT_EXPIRATION_MS = 6000000 * 1;

    @Value("12096000")
    private long refreshExpirationTime;

    private final UserDetailsServiceImpl userDetailsService;

    /**
     * === createAccessToken , createRefreshToken ===
     * 유저 정보를 넘겨받아 토큰 생성
     * 넘겨받은 authentication의 getName() 메소드를 통해 username 가져옴 (username : User의 num 필드로 설정함)
     * 각각 expiration time 설정
     * */


    /**
     * Access 토큰 생성
     * */

    public String createAccessToken(Authentication authentication){
        log.info("엑세스 토큰 진입 직후 >>> " + authentication);
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + JWT_EXPIRATION_MS);

        System.out.println("create access >>> "+ expireDate);

        log.info("엑세스 토큰 클레임 생성 후 >>> " + authentication);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * Refresh 토큰 생성
     * */
    public String createRefreshToken(Authentication authentication){
        log.info("리프레시 토큰 진입 직후 >>> " + authentication);
        Claims claims = Jwts.claims().setSubject(authentication.getName());
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + refreshExpirationTime);

        log.info("리프레시 토큰 클레임 생성 후 >>> " + authentication);

        String refreshToken = Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
        // redis에 저장
        redisTemplate.opsForValue().set(
                authentication.getName(),
                refreshToken,
                refreshExpirationTime,
                TimeUnit.MILLISECONDS
        );
        return refreshToken;
    }

    /**
     * ==== getAuthentication ====
     * 토큰을 복호화해 토큰에 들어있는 유저 정보 꺼냄
     * 이후 authentication 객체 반환
     * */

    /**
     * 토큰으로부터 클레임을 만들고, 이를 통해 User 객체 생성해 Authentication 객체 반환
     */
    public Authentication getAuthentication(String token){
        String userPrincipal = Jwts.parser().
                setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody().getSubject();
        UserDetails userDetails = userDetailsService.loadUserByUsername(userPrincipal);

        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
    /**
     * resolveToken
     * http 헤더로부터 bearer 토큰을 가져옴.
     */
    public String resolveToken(HttpServletRequest req){
        String bearerToken = req.getHeader("Authorization");
        if(bearerToken != null && bearerToken.startsWith("Bearer")){
            System.out.println(bearerToken);
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * resolveToken
     * http 헤더로부터 bearer 토큰을 가져옴.
     */
    public String resolveRefreshToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("refreshToken");

        System.out.println("resolveRefreshToken >>> " + bearerToken);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            System.out.println(bearerToken);
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * validateToken
     * 토큰 정보 검증
     * Jwts 모듈이 각각 상황에 맞는 exception 던져줌
     */
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        }catch(ExpiredJwtException e){
            e.printStackTrace();
            throw new IllegalArgumentException("토큰 잘못 됨1");
        }catch(JwtException e){
            throw new IllegalArgumentException("토큰 잘못 됨2");
        }
    }

    /**
     * 토큰으로 회원 정보 조회
     */
    public String getUserEmail(String token){
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // 엑세스 토큰 헤더 설정
    public void setHeaderAccessToken(HttpServletResponse response, String accessToken){
        response.setHeader("authorization", "Bearer " + accessToken);
    }

    // 리프레시 토큰 헤더 설정
    public void setHeaderRefreshToken(HttpServletResponse response, String refreshToken){
        response.setHeader("refreshToken", "Bearer " + refreshToken);
    }

    // get authentication by user email
    public Authentication getAuthenticationByUsername(String email){
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(userDetails,"",userDetails.getAuthorities());
    }

}
