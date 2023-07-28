package com.palette.palette.domain.feed.dto.list;

import com.palette.palette.domain.feed.dto.FeedUserResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
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
public class FeedResDto {

    private Long id;

    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private FeedUserResDto user;


    /**
     * entity -> dto
     */
    public static FeedResDto toDto(Feed feed) {
        return FeedResDto.builder()
                .id(feed.getId())
                .user(FeedUserResDto.toDto(feed.getUser()))
                .content(feed.getContent())
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
//                .feedImages(feed.getFeedImages().stream()
//                        .map(FeedImage)
//                        .collect(Collectors.toList()))
                .build();
    }

}
