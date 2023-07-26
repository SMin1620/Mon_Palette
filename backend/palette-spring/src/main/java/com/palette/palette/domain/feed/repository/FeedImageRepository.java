package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {
}
