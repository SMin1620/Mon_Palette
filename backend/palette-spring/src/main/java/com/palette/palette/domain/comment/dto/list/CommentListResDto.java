package com.palette.palette.domain.comment.dto.list;

import com.palette.palette.domain.comment.entity.Comment;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.user.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CommentListResDto {

    private Long id;

    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private BaseUserResDto user;


    public static CommentListResDto toDto(Comment comment) {

        return CommentListResDto.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .createAt(comment.getCreateAt())
                .updateAt(comment.getUpdateAt())
                .user(BaseUserResDto.toDto(comment.getUser()))
                .build();
    }
}
