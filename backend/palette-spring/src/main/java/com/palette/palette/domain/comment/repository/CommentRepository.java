package com.palette.palette.domain.comment.repository;

import com.palette.palette.domain.comment.dto.list.CommentListResDto;
import com.palette.palette.domain.comment.entity.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {


    @Query("select c from Comment c where c.feed.id = :feedId order by c.createAt asc")
    List<Comment> findAllByComment(Pageable pageable, @Param("feedId") Long feedId);

    @Query("select c.user.id from Comment c where c.id = :commentId")
    Long findUserIdByCommentId(@Param("commentId") Long commentId);
}
