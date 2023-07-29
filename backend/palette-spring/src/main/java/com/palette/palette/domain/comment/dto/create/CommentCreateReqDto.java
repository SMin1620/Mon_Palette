package com.palette.palette.domain.comment.dto.create;

import lombok.*;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CommentCreateReqDto {

    private String content;

}
