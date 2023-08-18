package com.palette.palette.domain.like.service;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.follow.repository.FollowRepository;
import com.palette.palette.domain.like.dto.list.FeedLikeUserResDto;
import com.palette.palette.domain.like.entity.FeedLike;
import com.palette.palette.domain.like.repository.FeedLikeRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class FeedLikeService {

    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final FollowRepository followRepository;


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

    /**
     * 피드 좋아요 목록 조회
     * @param feedId
     */
    public List<FeedLikeUserResDto> feedLikeList(Long feedId, User currentUser) {

        // 피드 유효성 검사
        feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드가 없습니다."));

        System.out.println("current >>> " + currentUser.toString());

        List<Follow> currentUserFollowers = followRepository.findByFromUser(currentUser.getEmail());

        System.out.println("currentUserFollowers >>> " + currentUserFollowers.stream().map(Follow::getToUser));
        // 피드에 좋아요한 사용자를 리스트로 가져오기
        List<User> feedLikeUser = feedLikeRepository.findAllByUser(feedId);

        // 해당 사용자가 다른 유저를 팔로우 헀는지 확인하는 로직
        List<FeedLikeUserResDto> feedLikeUserResDtoList = feedLikeUser.stream()
                .map(user -> {
                    boolean isFollowing = currentUserFollowers.stream()
                            .anyMatch(follow -> follow.getToUser().equals(user.getEmail()));
                    if (user.getEmail().equals(currentUser.getEmail())) {
                        isFollowing = true; // Set isFollowing to true for the current user
                    }
                    return FeedLikeUserResDto.toDto(user, isFollowing);
                })
                .collect(Collectors.toList());

        return feedLikeUserResDtoList;
    }
}
