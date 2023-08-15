package com.palette.palette.domain.oauth.google.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.palette.palette.domain.user.dto.oauth.UserOauthDto;
import com.palette.palette.domain.user.dto.token.TokenDto;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.core.env.Environment;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GoogleService {

    private final Environment env;
    private final RestTemplate restTemplate = new RestTemplate();
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public TokenDto socialLogin(HttpServletResponse response, String code, String registrationId){
        log.info("======================================================");
        System.out.println(code);
        String accessToken = getAccessToken(code, registrationId);
        JsonNode userResourceNode = getUserResource(accessToken, registrationId);

        System.out.println("userResourceNode = " + userResourceNode);

        UserOauthDto user = new UserOauthDto();
        log.info("userResource = {}", user);
        switch (registrationId) {
            case "google": {
                user.setEmail(userResourceNode.get("email").asText());
                user.setName(userResourceNode.get("name").asText());
                user.setProfileImage(userResourceNode.get("picture").asText());
                break;
            } default: {
                throw new RuntimeException("UNSUPPORTED SOCIAL TYPE");
            }
        }
        log.info("email = {}", user.getEmail());
        log.info("nickname {}", user.getName());
        log.info("profileImage {}", user.getProfileImage());
        log.info("======================================================");

        Optional<User> isUser = userRepository.findByEmail(user.getEmail());
        if(isUser.isEmpty()){
            userRepository.save(User.fromOauthEntity(user, passwordEncoder));
            userRepository.flush();
        }
        Optional<User> oauthUser = userRepository.findByEmail(user.getEmail());

        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                        oauthUser.get().getEmail(),
                        oauthUser.get().getEmail()
                    )
            );
            log.info("로그인 컨트롤러 에러 >>> " + authentication);

            String accessToken2 = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

            Optional<User> oauthUserNew = userRepository.findByEmail(oauthUser.get().getEmail());

            TokenDto tokenDto =TokenDto.builder()
                    .accessToken(accessToken2)
                    .refreshToken(refreshToken)
                    .userId(oauthUserNew.get().getId())
                    .build();
            // 헤더에 토큰 담기
            jwtTokenProvider.setHeaderAccessToken(response, accessToken);
            jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

            log.info("토큰Dto 생성 후 에러 >>> " + tokenDto);

            return tokenDto;
        }catch (Exception e){
            e.printStackTrace();
            throw new NullPointerException("로그인 에러");
        }

    }

    private String getAccessToken(String authorizationCode, String registrationId) {
        String clientId = env.getProperty("oauth2." + registrationId + ".client-id");
        String clientSecret = env.getProperty("oauth2." + registrationId + ".client-secret");
        String redirectUri = env.getProperty("oauth2." + registrationId + ".redirect-uri");
        String tokenUri = env.getProperty("oauth2." + registrationId + ".token-uri");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", authorizationCode);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity entity = new HttpEntity(params, headers);
        System.out.println(params);

        ResponseEntity<JsonNode> responseNode = restTemplate.exchange(tokenUri, HttpMethod.POST, entity, JsonNode.class);
        System.out.println(responseNode.toString());
        JsonNode accessTokenNode = responseNode.getBody();
        return accessTokenNode.get("access_token").asText();
    }
    private JsonNode getUserResource(String accessToken, String registrationId) {
        String resourceUri = env.getProperty("oauth2."+registrationId+".resource-uri");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity entity = new HttpEntity(headers);
        return restTemplate.exchange(resourceUri, HttpMethod.GET, entity, JsonNode.class).getBody();
    }

}
