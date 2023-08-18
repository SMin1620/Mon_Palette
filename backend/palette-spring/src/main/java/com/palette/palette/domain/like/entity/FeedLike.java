package com.palette.palette.domain.like.entity;

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
@Table(name = "feed_likes")
public class FeedLike {

    @Id
    @GeneratedValue
    @Column(name = "feed_like_id")
    private Long id;

    // 유저 - 피드 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 피드 - 피드 좋아요
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

}
