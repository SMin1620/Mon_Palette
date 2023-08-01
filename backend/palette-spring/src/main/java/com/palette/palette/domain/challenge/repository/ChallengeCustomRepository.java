package com.palette.palette.domain.challenge.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChallengeCustomRepository {

    Page<Challenge> findBySearchOption(Pageable pageable, String content, String orderBy, String color);

}
