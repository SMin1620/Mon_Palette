package com.palette.palette.domain.feed.dto;

import com.palette.palette.domain.user.entity.User;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FeedReqDto {

    @NotEmpty(message = "이미지가 필요합니다.")
    private String image;

    @NotEmpty(message = "사용자가 없습니다.")
    private User user;

}
