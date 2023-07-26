package com.palette.palette.domain.feed.dto.feed;

import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedReqDto {
    
    @Schema(description = "피드 내용", example = "테스트 내용")
    private String content;

    @Schema(description = "태그", example = "#테스트")
    private String tagContent;

    private List<FeedImageReqDto> feedImages;

}
