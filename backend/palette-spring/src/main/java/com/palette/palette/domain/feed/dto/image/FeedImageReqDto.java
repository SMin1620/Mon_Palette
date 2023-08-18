package com.palette.palette.domain.feed.dto.image;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedImageReqDto {

    @NotEmpty(message = "이미지가 필요합니다.")
    @Schema(description = "이미지 주소", example = "/test/test.png")
    private String feedImage;

}
