package com.palette.palette.domain.comment.service;

import com.palette.palette.domain.comment.dto.list.CommentListResDto;
import com.palette.palette.domain.comment.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;


    /**
     * 피드 목록 조회
     * @param feedId
     */
    public List<CommentListResDto> commentList(Long feedId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return commentRepository.findAllByComment(pageable, feedId).stream()
                .map(CommentListResDto::toDto)
                .collect(Collectors.toList());
    }
}
