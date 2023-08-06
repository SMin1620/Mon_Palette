package com.palette.palette.domain.challenge.dto.list;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResDto {

    private Long id;

    private String video;

    private String content;

    private Boolean isFollow;

    private Integer likeCount;

    private LocalDateTime createAt;

    private BaseUserResDto user;


    /**
     * entity -> dto
     */
    public static ChallengeResDto toDto(Challenge challenge) {

        return ChallengeResDto.builder()
                .id(challenge.getId())
                .video(challenge.getVideo())
                .content(challenge.getContent())
                .likeCount(challenge.getLikeCount())
                .createAt(challenge.getCreateAt())
                .user(BaseUserResDto.toDto(challenge.getUser()))
                .build();
    }
}
