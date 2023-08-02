package com.palette.palette.domain.search.service;


import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.search.dto.SearchRankResDto;
import com.palette.palette.domain.search.dto.SearchRecentResDto;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.sql.Date;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final FeedRepository feedRepository;
    private final ChallengeRepository challengeRepository;
    private final RedisTemplate<String, String> redisTemplate;
    private final UserRepository userRepository;


    /**
     * 피드 검색 필터 목록 조회
     */
    public List<FeedResDto> feedSearch(int page, int size, String content, String orderBy, String color, Long userId) {
        Pageable pageable = PageRequest.of(page, size);

        if (content != null) {
            ranking(content);
            saveRecentKeyword(userId, content);
        }

        return feedRepository.findBySearchOption(pageable, content, orderBy, color).getContent().stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());
    }


    /**
     * 챌린지 검색 필터 목록 조회
     */
    public List<ChallengeResDto> challengeSearch(int page, int size, String content, String orderBy, String color, Long userId) {
        Pageable pageable = PageRequest.of(page, size);

        if (content != null) {
            ranking(content);
            saveRecentKeyword(userId, content);
        }

        return challengeRepository.findBySearchOption(pageable, content, orderBy, color).getContent().stream()
                .map(ChallengeResDto::toDto)
                .collect(Collectors.toList());
    }


    /**
     * 인기 검색어 레디스 저장
     */
    public void ranking(String keyword) {

        Double score = 0.0;

        try {
            // 검색을하면 해당검색어를 value에 저장하고, score를 1 준다
            redisTemplate.opsForZSet().incrementScore("ranking", keyword, 1);
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 검색을하면 해당검색어를 value에 저장하고, score를 1 준다
        redisTemplate.opsForZSet().incrementScore("ranking", keyword, score);
    }


    /**
     * 최근 검색어 레디스 저장
     */
    @Transactional
    public void saveRecentKeyword(Long userId, String keyword) {

        ListOperations<String, String> listOperations = redisTemplate.opsForList();

        userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾지 못했습니다."));

        String key = "userId::" + userId;
        listOperations.leftPush(key, keyword);
        Date.from(ZonedDateTime.now().plusDays(7).toInstant()); // 최근 검색어가 7일동안 유지.
    }


    /**
     * 인기 검색어 목록 조회
     */
    public List<SearchRankResDto> rankList() {

        String key = "ranking";
        ZSetOperations<String, String> ZSetOperations = redisTemplate.opsForZSet();
        Set<ZSetOperations.TypedTuple<String>> typedTuples = ZSetOperations.reverseRangeWithScores(key, 0, 9);  //score순으로 10개 보여줌

        return typedTuples.stream()
                .map(typedTuple -> SearchRankResDto.builder()
                        .keyword(typedTuple.getValue())
                        .score(typedTuple.getScore().intValue())
                        .build())
                .collect(Collectors.toList());
    }


    public List<SearchRecentResDto> recentList(Long userId) {

        ListOperations<String, String> listOperations = redisTemplate.opsForList();
        String key = "userId::" + userId;

        long size = listOperations.size(key) == null ? 0 : listOperations.size(key); // NPE 체크해야함.

        List<SearchRecentResDto> collect = listOperations.range(key, 0, size).stream()
                .distinct() // 중복된 요소 제거
                .map(SearchRecentResDto::toDto)
                .collect(Collectors.toList());
        return collect;
    }
}
