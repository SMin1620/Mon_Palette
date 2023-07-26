package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {

    List<FeedImage> findAllByFeedId(Long feedId);
}
