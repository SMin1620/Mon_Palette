package com.palette.palette.domain.feed.service;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.feed.dto.detail.FeedDetailResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.dto.list.FeedBaseDto;
import com.palette.palette.domain.feed.dto.list.FeedMainResDto;
import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.feed.dto.update.FeedUpdateResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.entity.FeedImage;
import com.palette.palette.domain.feed.repository.FeedImageRepository;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.follow.repository.FollowRepository;
import com.palette.palette.domain.hashtag.entity.FeedHashtag;
import com.palette.palette.domain.hashtag.entity.Hashtag;
import com.palette.palette.domain.hashtag.repository.HashtagRepository;
import com.palette.palette.domain.like.entity.FeedLike;
import com.palette.palette.domain.like.repository.FeedLikeRepository;
import com.palette.palette.domain.search.dto.SearchRankResDto;
import com.palette.palette.domain.search.service.SearchService;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeedService {

    private final FeedRepository feedRepository;
    private final FeedImageRepository feedImageRepository;
    private final HashtagRepository hashtagRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final SearchService searchService;

    /**
     * 메인 피드 목록 조회
     */
    public List<FeedMainResDto> mainFeedList(int page, int size, User user) {
        Pageable pageable = PageRequest.of(page, size);

        List<FeedMainResDto> feeds = feedRepository.findByMainFeed(pageable, user).getContent().stream()
                .map(FeedMainResDto::toDto)
                .collect(Collectors.toList());

        return feeds;
    }


    /**
     * 피드 목록 조회
     */
    public FeedBaseDto feedList(int page, int size, String color, String orderBy) {
        Pageable pageable = PageRequest.of(page, size);

        // 인기 해시태그 목록 조회
        List<SearchRankResDto> searchRankResDtos = searchService.tagList();

        List<FeedResDto> feeds = feedRepository.findByFeedList(pageable, color, orderBy).getContent().stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());

        return FeedBaseDto.builder()
                .tagRanking(searchRankResDtos)
                .feeds(feeds)
                .build();
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

            // 해시태그 랭킹에 반영
            searchService.tags(name);

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
    public FeedDetailResDto feedDetail(Long feedId, Long userId) {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        // 피드 유효성 검사
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드가 없습니다."));

        // 사용자가 해당 피드를 좋아요 했는지 체크
        Boolean isLiked = false;
        if (feedLikeRepository.findByFeedAndUser(feed, user).isPresent()) {
            isLiked = true;
        }

        // 사용자가 피드 작성자를 팔로우 했는지 체크
        Boolean isFollowingAuthor = false;
        if (feed.getUser().getId().equals(userId)) {
            // If the feed's author is the same as the current user, consider them as following themselves
            isFollowingAuthor = true;
        } else {
            List<Follow> currentUserFollowers = followRepository.findByFromUser(user.getEmail());
            if (currentUserFollowers.stream().anyMatch(follow -> follow.getToUser().equals(feed.getUser().getEmail()))) {
                isFollowingAuthor = true;
            }
        }

        return FeedDetailResDto.toDto(feed, isLiked, isFollowingAuthor);
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

        // 피드 해시태그 업데이트
        Set<String> newHashtags = new HashSet<>(feedReqDto.getHashtags());

        // 기존 해시태그를 가져와서 유지 또는 삭제
        List<FeedHashtag> existingFeedHashtags = feed.getHashtags();

        for (Iterator<FeedHashtag> iterator = existingFeedHashtags.iterator(); iterator.hasNext();) {
            FeedHashtag feedHashtag = iterator.next();
            Hashtag hashtag = feedHashtag.getHashtag();
            String hashtagName = hashtag.getName();

            if (newHashtags.contains(hashtagName)) {
                // 새로운 해시태그에 포함되어 있는 경우 유지
                newHashtags.remove(hashtagName);
            } else {
                // 새로운 해시태그에 포함되어 있지 않은 경우 삭제
                iterator.remove();
            }
        }

        // 새로운 해시태그 추가
        for (String hashtagName : newHashtags) {
            Hashtag hashtag = hashtagRepository.findByName(hashtagName);
            if (hashtag == null) {
                hashtag = Hashtag.builder()
                        .name(hashtagName)
                        .build();
                hashtagRepository.save(hashtag);

                // 해시태그 랭킹에 반영
                searchService.tags(hashtag.getName());
            }

            FeedHashtag feedHashtag = FeedHashtag.builder()
                    .feed(feed)
                    .hashtag(hashtag)
                    .build();
            existingFeedHashtags.add(feedHashtag);
        }

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

        Feed feed = feedRepository.findById(feedId).orElseThrow(() -> new IllegalArgumentException("해당 피드가 없습니다."));
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
