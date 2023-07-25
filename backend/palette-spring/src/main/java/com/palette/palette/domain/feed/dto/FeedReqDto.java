package com.palette.palette.domain.feed.dto;

import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.user.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FeedReqDto {

    @NotEmpty(message = "이미지가 필요합니다.")
    private List<FeedImage> feedImages;

    @NotEmpty(message = "내용이 필요합니다.")
    private String content;

    private String tagContent;


}
