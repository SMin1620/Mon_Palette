package com.palette.palette.domain.feed.service;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.detail.FeedDetailResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.feed.dto.update.FeedUpdateResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.repository.FeedImageRepository;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.hashtag.entity.Hashtag;
import com.palette.palette.domain.hashtag.repository.HashtagRepository;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;
    private final HashtagRepository hashtagRepository;

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
    public FeedResDto feedCreate(FeedReqDto feedReqDto, List<FeedImageReqDto> images, User user) {

        System.out.println("feedReqDto >>> " + feedReqDto.getFeedImages());

        // 해시태그 생성
        List<Hashtag> hashtags = new ArrayList<>();
        for (String name : feedReqDto.getHashtags()) {

            // 해시태그 중복 확인
            Hashtag existingHashtag = hashtagRepository.findByName(name);
            if (existingHashtag == null) {
                Hashtag hashtag = Hashtag.builder()
                        .name(name)
                        .build();

                hashtags.add(hashtag);
                hashtagRepository.save(hashtag);
            } else {
                hashtags.add(existingHashtag);
            }
        }

        // 피드 생성
        Feed feed = Feed.toEntity(feedReqDto, images, user, hashtags);

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

    /**
     * 피드 수정 :: 해당 피드의 이미지 가져오기
     * @param feedId
     */
    public List<FeedImageResDto> findAllByFeed(Long feedId) {

        List<FeedImage> feedImageList = feedImageRepository.findAllByFeedId(feedId);

        System.out.println("feedImageList >>> " + feedImageList);

        return feedImageList.stream()
                .map(FeedImageResDto::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 피드 수정
     * @param feedReqDto
     * @param feedImages
     */
    @Transactional
    public FeedUpdateResDto feedUpdate(FeedReqDto feedReqDto, List<FeedImageResDto> feedImages, Long feedId) {

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new IllegalArgumentException("해당 피드가 없습니다."));
        List<FeedImageReqDto> addImage = new ArrayList<>();

        if (!CollectionUtils.isEmpty(feedReqDto.getFeedImages())) { // 기존의 피드의 이미지가 있다면,
            // 기존 이미지 삭제
            for (FeedImageResDto feedImage : feedImages) {
                feedImageRepository.deleteById(feedImage.getId());
            }

            // 수정 이미지 생성
            for (FeedImageReqDto feedImageReqDto : feedReqDto.getFeedImages()) {
                addImage.add(feedImageReqDto);
            }

            feed.update(feedReqDto, addImage);
        }

        // 피드 해시태그
        // 해시태그 검증 로직
        List<Hashtag> notAlreadyHashTag = new ArrayList<>();

//        feed.setHashtags(notAlreadyHashTag);

//        for (String name : feedReqDto.getHashtags()) {
//            // 이미 있는 해시태그인지 검사
//            System.out.println(" findByName >>> " + hashtagRepository.findByName(name));
//            if (hashtagRepository.findByName(name) == null) {
//                // 중복이 없다면,
//                System.out.println("해시 태그 중복아님");
//                notAlreadyHashTag.add(name);
//
//                Hashtag newHashtag = Hashtag.builder().name(name).feed(feed).build();
//                hashtagRepository.save(newHashtag);
//            }
//        }

        // 피드 업데이트 수행
        feedRepository.save(feed);

        return FeedUpdateResDto.toDto(feed);
    }

    /**
     * 피드 삭제
     * @param feedId
     */
    @Transactional
    public void feedDelete(Long feedId) {

        // 사용자 유효성 검사

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new IllegalArgumentException("해당 피드기 없습니다."));
        feedRepository.deleteById(feedId);
        feed.delete();
    }


    /**
     * 피드 작성자 ID 가져오기
     * @param feedId
     */
    public Long getFeedUserId(Long feedId) {
        return feedRepository.findUserIdByFeedId(feedId);
    }
}
