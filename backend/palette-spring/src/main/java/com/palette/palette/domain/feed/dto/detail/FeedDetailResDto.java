package com.palette.palette.domain.feed.dto.detail;

import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.hashtag.entity.FeedHashtag;
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
public class FeedDetailResDto {

    private Long id;

    private String content;

    private List<String> hashtags;

    private Boolean isLiked;

    private Integer likeCount;

    private Boolean isFollow;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private BaseUserResDto user;

    /**
     * entity -> dto
     */
    public static FeedDetailResDto toDto(Feed feed, Boolean isLiked, Boolean isFollow) {

        // 해시태그
        List<String> hashTags = new ArrayList<>();
        for (FeedHashtag hashtag : feed.getHashtags()) {
            hashTags.add(hashtag.getHashtag().getName());
        }

        return FeedDetailResDto.builder()
                .id(feed.getId())
                .user(BaseUserResDto.toDto(feed.getUser()))   // 토큰에서 받아와야 함.
                .content(feed.getContent())
                .hashtags(hashTags)
                .isLiked(isLiked)
                .likeCount(feed.getLikeCount())
                .isFollow(isFollow)
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
                .build();
    }

}
