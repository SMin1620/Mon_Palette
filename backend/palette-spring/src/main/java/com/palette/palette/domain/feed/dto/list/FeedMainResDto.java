package com.palette.palette.domain.feed.dto.list;

import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
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
public class FeedMainResDto {

    private Long id;

    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private BaseUserResDto user;


    /**
     * entity -> dto
     */
    public static FeedMainResDto toDto(Feed feed) {

        return FeedMainResDto.builder()
                .id(feed.getId())
                .user(BaseUserResDto.toDto(feed.getUser()))
                .content(feed.getContent())
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
                .build();
    }

}
