package com.palette.palette.domain.challenge.dto.detail;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChallengeDetailResDto {

    private Long id;

    private String video;

    private String thumbnail;

    private String content;

    private Boolean isLiked;

    private Integer likeCount;

    private Boolean isFollow;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private BaseUserResDto user;

    /**
     * entity -> dto
     */
    public static ChallengeDetailResDto toDto(Challenge challenge, Boolean isLiked, Boolean isFollow) {

        return ChallengeDetailResDto.builder()
                .id(challenge.getId())
                .video(challenge.getVideo())
                .content(challenge.getContent())
                .isLiked(isLiked)
                .likeCount(challenge.getLikeCount())
                .isFollow(isFollow)
                .isDelete(challenge.getIsDelete())
                .deleteAt(challenge.getDeleteAt())
                .createAt(challenge.getCreateAt())
                .updateAt(challenge.getUpdateAt())
                .user(BaseUserResDto.toDto(challenge.getUser()))
                .build();
    }
}
