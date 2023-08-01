package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface FeedCustomRepository {

    Page<Feed> findBySearchOption(Pageable pageable, String content);

}
