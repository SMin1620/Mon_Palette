package com.palette.palette.domain.feed.dto.feed;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.user.entity.User;
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
public class FeedResDto {

    private Long id;

    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<String> feedImages;

    private User user;

    /**
     * entity -> dto
     */
    public static FeedResDto toDto(Feed feed) {
        return FeedResDto.builder()
                .id(feed.getId())
                .user(feed.getUser())   // 토큰에서 받아와야 함.
                .content(feed.getContent())
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages().stream()
                        .map(FeedImage::getImagePath)
                        .collect(Collectors.toList()))
                .build();
    }

}
