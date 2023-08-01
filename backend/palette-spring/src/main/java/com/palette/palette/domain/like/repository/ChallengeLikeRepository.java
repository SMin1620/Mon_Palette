package com.palette.palette.domain.like.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.like.entity.ChallengeLike;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {

    Optional<ChallengeLike> findByChallengeAndUser(Challenge challenge, User user);
}
