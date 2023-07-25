package com.palette.palette.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // SecuritySecheme 명
    String jwtSchemeName = "jwtAuth";

    SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwtSchemeName);

    // SecuritySchemes 등록
    Components components = new Components()
            .addSecuritySchemes(jwtSchemeName, new SecurityScheme()
                    .name(jwtSchemeName)
                    .type(SecurityScheme.Type.HTTP) // HTTP 방식
                    .scheme("bearer")
                    .bearerFormat("JWT")); // 토큰 형식을 지정하는 임의의 문자(Optional)


    @Bean
    public OpenAPI swaggerApi(){
        return new OpenAPI()
                .components(new Components())
                .info(new Info()
                        .title("몽, 팔레트 jwt")
                        .description("몽, 팔레트 jwt")
                        .version("1.0.0"))
                .addSecurityItem(securityRequirement)
                .components(components);
    }
}
