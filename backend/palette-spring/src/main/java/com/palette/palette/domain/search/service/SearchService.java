package com.palette.palette.domain.search.service;


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


    /**
     * 피드 검색 목록 조회
     */
    public List<FeedResDto> feedSearch(int page, int size, String content, String orderBy, String color) {
        Pageable pageable = PageRequest.of(page, size);

        return feedRepository.findBySearchOption(pageable, content, orderBy, color).getContent().stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());
    }


}
