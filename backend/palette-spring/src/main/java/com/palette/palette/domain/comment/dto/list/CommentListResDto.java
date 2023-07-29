package com.palette.palette.domain.comment.dto.list;

import com.palette.palette.domain.comment.entity.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CommentListResDto {

    private Long id;

    private String name;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;


    public static CommentListResDto toDto(Comment comment) {

        return CommentListResDto.builder()
                .id(comment.getId())
                .name(comment.getContent())
                .createAt(comment.getCreateAt())
                .updateAt(comment.getUpdateAt())
                .build();
    }
}
