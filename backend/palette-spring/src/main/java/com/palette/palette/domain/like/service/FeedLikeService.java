package com.palette.palette.domain.like.service;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.like.entity.FeedLike;
import com.palette.palette.domain.like.repository.FeedLikeRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FeedLikeService {

    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final FeedLikeRepository feedLikeRepository;


    /**
     * 피드 좋아요
     */
    @Transactional
    public void feedLike(Long feedId, Long userId) throws Exception {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        // 피드 유효성 검사
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드가 없습니다."));


        // 이미 좋아요 되어있는지 체크
        if (feedLikeRepository.findByFeedAndUser(feed, user).isPresent()) {
            throw new Exception("이미 좋아요 되었습니다.");
        }

        FeedLike feedLike = FeedLike.builder()
                .feed(feed)
                .user(user)
                .build();

        feedLikeRepository.save(feedLike);

        feed.addLike();
    }

    @Transactional
    public void feedUnlike(Long feedId, Long userId) throws Exception {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        // 피드 유효성 검사
        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드가 없습니다."));

        feedLikeRepository.delete(feedLikeRepository.findByFeedAndUser(feed, user)
                .orElseThrow(() -> new NotFoundException("이미 좋아요를 취소했습니다.")));

        feed.cancelLike();
    }
}
