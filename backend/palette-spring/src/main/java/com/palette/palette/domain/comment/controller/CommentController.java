package com.palette.palette.domain.comment.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.comment.dto.create.CommentCreateReqDto;
import com.palette.palette.domain.comment.service.CommentService;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.PreUpdate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@Tag(name = "피드 댓글 API")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class CommentController {

    private final UserRepository userRepository;
    private final CommentService commentService;


    /**
     * 댓글 목록 조회
     */
    @Operation(summary = "피드 댓글 목록 조회")
    @GetMapping("/feed/{feedId}/comment")
    public BaseResponse commentList(
            @PathVariable("feedId") Long feedId,
            @RequestParam("page") int page,
            Authentication authentication
    ) {
        System.out.println("댓글 목록 조회 컨트롤러");

        try {

            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            return BaseResponse.success(commentService.commentList(feedId, page, 10));
        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("댓글 목록 조회 실패");
        }
    }

    /**
     * 댓글 생성
     */
    @Operation(summary = "피드 댓글 생성")
    @PostMapping("/feed/{feedId}/comment")
    public BaseResponse commentCreate(
            @RequestParam("feedId") Long feedId,
            @RequestBody CommentCreateReqDto request,
            Authentication authentication
    ) {
        System.out.println("댓글 생성 컨트롤러");

        try {
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 피드 생성
            commentService.commentCreate(request, feedId, currentUserId);

            return BaseResponse.success(true);

        } catch (Exception e) {
            e.printStackTrace();
            return BaseResponse.error("피드 댓글 생성 실패");
        }
    }

    /**
     * 댓글 수정
     */
    @Operation(summary = "피드 댓글 수정")
    @PutMapping("/comment/{commentId}")
    public BaseResponse commentUpdate(
            @PathVariable("commentId") Long commentId,
            @RequestBody CommentCreateReqDto request,
            Authentication authentication
    ) {
        System.out.println("댓글 수정 컨트롤러");

        try {
            // 인가된 사용자 정보
            UserDetails userDetails = ((UserDetails) authentication.getPrincipal());

            System.out.println("Controller userDetails >>> " + userDetails);
            Long currentUserId = userRepository.findByEmail(userDetails.getUsername()).get().getId();
            System.out.println("Controller user id>>> " + currentUserId);

            // 유저 예외처리 :: 예외처리 커스텀 필요
            if (currentUserId == null) {
                throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
            }

            // 댓글 작성자의 이메일 가져옴
            Long commentUserId = commentService.getCommentUserId(commentId);

            System.out.println("feedUserId >>> " + commentUserId);

            // 작성자와 현재 유저가 일치한지 처리하는 로직
            if (! currentUserId.equals(commentUserId)) {
                throw new UserPrincipalNotFoundException("작성자와 현재 사용자가 일치하지 않습니다.");
            }

            CommentCreateReqDto commentCreateReqDto = CommentCreateReqDto.builder()
                            .content(request.getContent())
                                    .build();

            commentService.commentUpdate(commentCreateReqDto, commentId, currentUserId);

            return BaseResponse.success(true);

        } catch (Exception e) {

            e.printStackTrace();
            return BaseResponse.error("피드 댓글 수정 실패");
        }
    }
}
