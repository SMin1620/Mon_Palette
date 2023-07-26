package com.palette.palette.config;


import com.palette.palette.jwt.JwtAccessDenieHandler;
import com.palette.palette.jwt.JwtAuthenticationEntryPoint;
import com.palette.palette.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity(debug = true)
public class SecurityConfig {

    private final JwtTokenProvider jwtTokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDenieHandler jwtAccessDenieHandler;

    private final CorsConfig corsConfig;
    private final AuthenticationConfiguration authenticationConfiguration;



}
