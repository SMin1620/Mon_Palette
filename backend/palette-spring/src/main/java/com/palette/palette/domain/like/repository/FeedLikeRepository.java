package com.palette.palette.domain.like.repository;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.like.entity.FeedLike;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {

    Optional<FeedLike> findByFeedAndUser(Feed feed, User user);
}
