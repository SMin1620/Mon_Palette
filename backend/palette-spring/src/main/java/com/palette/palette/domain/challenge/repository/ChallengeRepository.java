package com.palette.palette.domain.challenge.repository;

import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long>, ChallengeCustomRepository {

    /**
     * 피드 목록 조회 :: 삭제 여부 기분 (false)
     */
    @Query("select c from Challenge c where c.isDelete = false order by c.createAt desc")
    Page<Challenge> findAllByDelete(Pageable pageable);

    @Query("select c.user.id from Challenge c where c.id = :challengeId")
    Long findByChallengeUserId(@Param("challengeId") Long challengeId);

    /**
     * 챌린지 인기 조회 10개
     */
    @Query("select c from Challenge c order by c.likeCount desc limit 10")
    List<Challenge> findAllByBest();

    /**
     * 챌린지 팔로우 최근 목록 조회
     */
    @Query("select c from Challenge c " +
            "where c.createAt >= :twentyFourHoursAgo and c.user.email in (select f.toUser from Follow f where f.fromUser = :userEmail) " +
            "order by c.createAt desc"
    )
    List<Challenge> findAllByRecentFollow(@Param("twentyFourHoursAgo") LocalDateTime twentyFourHoursAgo, @Param("userEmail") String userEmail);

}
