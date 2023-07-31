package com.palette.palette.domain.challenge.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    /**
     * 피드 목록 조회 :: 삭제 여부 기분 (false)
     */
    @Query("select c from Challenge c where c.isDelete = false order by c.createAt desc")
    Page<Challenge> findAllByDelete(Pageable pageable);

    @Query("select c.user.id from Challenge c where c.id = :challengeId")
    Long findByChallengeUserId(@Param("challengeId") Long challengeId);
}
