package com.palette.palette.domain.search.service;


import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final FeedRepository feedRepository;
    private final ChallengeRepository challengeRepository;


    /**
     * 피드 검색 필터 목록 조회
     */
    public List<FeedResDto> feedSearch(int page, int size, String content, String orderBy, String color) {
        Pageable pageable = PageRequest.of(page, size);

        return feedRepository.findBySearchOption(pageable, content, orderBy, color).getContent().stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());
    }


    /**
     * 챌린지 검색 필터 목록 조회
     */
    public Object challengeSearch(int page, int size, String content, String orderBy, String color) {
        Pageable pageable = PageRequest.of(page, size);

        return challengeRepository.findBySearchOption(pageable, content, orderBy, color).getContent().stream()
                .map(ChallengeResDto::toDto)
                .collect(Collectors.toList());
    }
}
