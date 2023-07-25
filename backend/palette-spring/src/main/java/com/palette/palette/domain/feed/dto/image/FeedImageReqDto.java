package com.palette.palette.domain.feed.dto.image;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@Getter
public class FeedImageReqDto {

    @NotEmpty(message = "이미지가 필요합니다.")
    private List<MultipartFile> feedImages;

}
