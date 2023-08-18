package com.palette.palette.domain.feed.dto.create;

import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.hashtag.dto.HashTagResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedCreateResDto {

    private Long id;

    private String content;

    private List<HashTagResDto> hashtags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private BaseUserResDto user;

}
