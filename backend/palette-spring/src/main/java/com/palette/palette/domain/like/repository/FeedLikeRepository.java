package com.palette.palette.domain.like.repository;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.like.entity.FeedLike;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {

    Optional<FeedLike> findByFeedAndUser(Feed feed, User user);

    List<FeedLike> findAllByFeed(Feed feed);

    @Query("select fi.user from FeedLike fi where fi.feed.id = :feedId")
    List<User> findAllByUser(Long feedId);
}
