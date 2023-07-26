package com.palette.palette.domain.feed.service;

import com.palette.palette.domain.feed.dto.detail.FeedDetailResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedService {

    private final FeedRepository feedRepository;

    /**
     * 피드 목록 조회
     */
    public List<FeedResDto> feedList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<FeedResDto> feeds = feedRepository.findAllByDelete(pageable).getContent().stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());

        return feeds;
    }

    /**
     * 피드 생성
     */
    @Transactional
    public FeedResDto feedCreate(FeedReqDto feedReqDto, List<FeedImageReqDto> images) {

        // 피드 생성
        Feed feed = Feed.toEntity(feedReqDto, images);

        System.out.println("feedReqDto >>> " + feedReqDto.getFeedImages());

        if (feedReqDto.getFeedImages() == null) {
            System.out.println("null");
        }

        feedRepository.save(feed);

        return FeedResDto.toDto(feed);
    }

    /**
     * 피드 상세 조회
     * @param feedId
     */
    public FeedDetailResDto feedDetail(Long feedId) {

        Feed feed = feedRepository.findById(feedId).orElseThrow(() ->
                new IllegalArgumentException("상세 오류 입니다."));

        return FeedDetailResDto.toDto(feed);
    }
}
