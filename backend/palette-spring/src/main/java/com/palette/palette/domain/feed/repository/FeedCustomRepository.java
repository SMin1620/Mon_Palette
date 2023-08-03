package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedCustomRepository {

    Page<Feed> findBySearchOption(Pageable pageable, String content, String orderBy, String color);

    Page<Feed> findByMainFeed(Pageable pageable, User user);

    Page<Feed> findByFeedList(Pageable pageable, String color, String orderBy);

}
