package com.palette.palette.domain.feed.service;

import com.palette.palette.domain.feed.dto.feed.FeedReqDto;
import com.palette.palette.domain.feed.dto.feed.FeedResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.repository.FeedImageRepository;
import com.palette.palette.domain.feed.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;

    /**
     * 피드 목록 조회
     */
    public List<Feed> feedList() {
        return feedRepository.findAll();
    }

    /**
     * 피드 생성
     */
    @Transactional
    public FeedResDto feedCreate(
            FeedReqDto feedReqDto,
            FeedImageReqDto feedImageReqDto) {

        // 피드 생성
        Feed feed = Feed.toEntity(feedReqDto);
        feedRepository.save(feed);

        // 피드 이미지 생성
        if (feedImageReqDto.getFeedImageUrl() != null) {

            for (String image : feedImageReqDto.getFeedImageUrl()) {
                if (!image.equals("")) {

                    // dto -> enetity
                    FeedImage feedImage = FeedImage.builder()
                            .imagePath(image)
                            .feed(feed)
                            .build();

                    // feed image save
                    feedImageRepository.save(feedImage);
                }
            }
        }
        feedRepository.save(feed);

        return FeedResDto.toDto(feed);
    }

}
