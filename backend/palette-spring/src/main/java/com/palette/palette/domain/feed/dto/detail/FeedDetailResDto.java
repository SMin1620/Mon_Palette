package com.palette.palette.domain.feed.dto.detail;

import com.palette.palette.domain.feed.dto.FeedUserResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
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
public class FeedDetailResDto {

    private Long id;

    private String content;

    private List<String> hashTags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private List<FeedImage> feedImages;

    private FeedUserResDto user;

    /**
     * entity -> dto
     */
    public static FeedDetailResDto toDto(Feed feed) {

        List<String> hashTags = new ArrayList<>();
        for (Hashtag hashtag : feed.getHashtags()) {
            hashTags.add(hashtag.getName());
        }


        return FeedDetailResDto.builder()
                .id(feed.getId())
                .user(FeedUserResDto.toDto(feed.getUser()))   // 토큰에서 받아와야 함.
                .content(feed.getContent())
                .hashTags(hashTags)
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .feedImages(feed.getFeedImages())
//                .feedImages(feed.getFeedImages().stream()
//                        .map(FeedImage)
//                        .collect(Collectors.toList()))
                .build();
    }

}
