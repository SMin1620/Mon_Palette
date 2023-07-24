package com.palette.palette.domain.feed.dto;

import com.palette.palette.domain.user.entity.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class FeedResDto {

    private Long id;

    private String image;

    private User user;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

}
