package com.palette.palette.domain.oauth.google.controller;

import com.palette.palette.domain.oauth.google.service.GoogleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/login/oauth2", produces = "application/json")
@RequiredArgsConstructor
@Tag(name = "OAUTH2.0 API")
public class GoogleController {

    private final GoogleService googleService;

    @GetMapping("/code/{registrationId}")
    public void googleLogin(@RequestParam String code, @PathVariable String registrationId){
        try{
            googleService.socialLogin(code, registrationId);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println("OAUTH로그인에 실패하였습니다.");
        }

    }

}
