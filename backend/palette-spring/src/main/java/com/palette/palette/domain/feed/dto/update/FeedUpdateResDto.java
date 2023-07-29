package com.palette.palette.domain.feed.dto.update;

import com.palette.palette.domain.feed.dto.FeedUserResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.hashtag.entity.FeedHashtag;
import com.palette.palette.domain.hashtag.entity.Hashtag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedUpdateResDto {

    private Long id;

    private String content;

    private List<String> hashtags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private FeedUserResDto user;

    /**
     * entity -> dto
     */
    public static FeedUpdateResDto toDto(Feed feed) {

        // 해시태그
        List<String> hashTags = new ArrayList<>();
        for (FeedHashtag hashtag : feed.getHashtags()) {
            hashTags.add(hashtag.getHashtag().getName());
        }

        return FeedUpdateResDto.builder()
                .id(feed.getId())
                .user(FeedUserResDto.toDto(feed.getUser()))   // 토큰에서 받아와야 함.
                .content(feed.getContent())
                .hashtags(hashTags)
                .updateAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
                .build();
    }
}
