package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.dto.image.FeedImageResDto;
import com.palette.palette.domain.feed.entity.FeedImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedImageRepository extends JpaRepository<FeedImage, Long> {

    @Query("select fi from FeedImage fi where fi.feed.id = :feedId")
    List<FeedImage> findAllByFeedId(@Param("feedId") Long feedId);

}
