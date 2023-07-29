package com.palette.palette.domain.comment.service;

import com.palette.palette.domain.comment.dto.create.CommentCreateReqDto;
import com.palette.palette.domain.comment.dto.list.CommentListResDto;
import com.palette.palette.domain.comment.entity.Comment;
import com.palette.palette.domain.comment.repository.CommentRepository;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final FeedRepository feedRepository;
    private final UserRepository userRepository;


    /**
     * 댓글 목록 조회
     * @param feedId
     */
    public List<CommentListResDto> commentList(Long feedId, int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return commentRepository.findAllByComment(pageable, feedId).stream()
                .map(CommentListResDto::toDto)
                .collect(Collectors.toList());
    }

    /**
     * 댓글 생성
     * @param request
     * @param feedId
     */
    @Transactional
    public void commentCreate(CommentCreateReqDto request, Long feedId, Long userId) {

        Feed feed = feedRepository.findById(feedId)
                .orElseThrow(() -> new NotFoundException("피드를 찾을 수 없습니다."));

        User user =  userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("현재 사용자를 찾을 수 없습니다."));

        Comment comment = Comment.toEntity(request, feed, user);
        commentRepository.save(comment);
    }
}
