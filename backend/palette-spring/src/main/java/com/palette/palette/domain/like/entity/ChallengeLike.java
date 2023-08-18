package com.palette.palette.domain.like.entity;


import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
@Entity
@Table(name = "challenge_likes")
public class ChallengeLike {

    @Id
    @GeneratedValue
    @Column(name = "challenge_like_id")
    private Long id;

    // 유저 - 피드 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 피드 - 피드 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

}
