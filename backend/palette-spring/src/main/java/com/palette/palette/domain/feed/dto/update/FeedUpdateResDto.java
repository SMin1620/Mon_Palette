package com.palette.palette.domain.feed.dto.update;

import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.user.entity.User;
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
public class FeedUpdateResDto {

    private Long id;

    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private User user;

    /**
     * entity -> dto
     */
    public static FeedUpdateResDto update(Feed feed, FeedReqDto feedReqDto) {
        return FeedUpdateResDto.builder()
                .id(feed.getId())
                .user(feed.getUser())   // 토큰에서 받아와야 함.
                .content(feed.getContent())
                .updateAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
                .build();
    }

}
