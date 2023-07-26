package com.palette.palette.domain.feed.dto.image;

import com.palette.palette.domain.feed.entity.FeedImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedImageResDto {

    private Long id;

    private String imagePath;


    /**
     * entity -> dto
     */
    public static FeedImageResDto toDto(FeedImage feedImage) {
        return FeedImageResDto.builder()
                .id(feedImage.getId())
                .imagePath(feedImage.getImagePath())
                .build();
    }

}
