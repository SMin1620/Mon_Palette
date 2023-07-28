package com.palette.palette.domain.feed.dto.create;

import com.palette.palette.domain.feed.dto.FeedUserResDto;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.hashtag.dto.HashTagResDto;
import com.palette.palette.domain.hashtag.entity.Hashtag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedCreateResDto {

    private Long id;

    private String content;

    private List<HashTagResDto> hashTags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private FeedUserResDto user;


    /**
     * entity -> dto
     */
    public static FeedCreateResDto toDto(Feed feed) {
        return FeedCreateResDto.builder()
                .id(feed.getId())
                .user(FeedUserResDto.toDto(feed.getUser()))
                .content(feed.getContent())
                .hashTags(feed.getHashtags().stream()
                        .map(HashTagResDto::toDto)
                        .collect(Collectors.toList()))
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
                .build();
    }
}
