package com.palette.palette.domain.challenge.entity;

import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@SQLDelete(sql = "UPDATE challenges SET is_delete = true, delete_at = CURRENT_TIMESTAMP WHERE challenge_id = ?")  // delete 쿼리가 발생하면 해당 쿼리가 대신 실행.
@Where(clause = "is_delete = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
@Builder
@Entity
@Table(name = "challenges")
public class Challenge {

    @Id
    @GeneratedValue
    @Column(name = "challenge_id")
    private Long id;

    @Column(nullable = false, length = 2000)
    private String video;

    @Column(nullable = false, length = 2000)
    private String thumbnail;

    @Column(nullable = false)
    private String content;

    @Builder.Default()
    private Integer likeCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private Boolean isDelete;

    private LocalDateTime deleteAt;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    /**
     * dto -> entity
     */
    public static Challenge toEntity(ChallengeCreateReqDto challengeCreateReqDto, User user) {

        return Challenge.builder()
                .video(challengeCreateReqDto.getVideo())
                .thumbnail(challengeCreateReqDto.getThumbnail())
                .content(challengeCreateReqDto.getContent())
                .user(user)
                .isDelete(false)
                .createAt(LocalDateTime.now())
                .build();
    }

    /**
     * 수정
     */
    public void update(ChallengeCreateReqDto dto) {
        this.video = dto.getVideo();
        this.content = dto.getContent();
        this.updateAt = LocalDateTime.now();
    }

    /**
     * 삭제
     */
    public void delete() {
        this.setDeleteAt(LocalDateTime.now());
    }

    /**
     * 챌린지 좋아요 추가
     */
    public void addLike() {
        this.likeCount += 1;
    }

    /**
     * 챌린지 좋아요 취소
     */
    public void cancelLike() {
        this.likeCount -= 1;
    }
}
