package com.palette.palette.domain.hashtag.repository;

import com.palette.palette.domain.hashtag.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    Hashtag findByName(String name);
}
