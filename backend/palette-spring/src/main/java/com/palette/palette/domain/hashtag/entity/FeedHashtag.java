package com.palette.palette.domain.hashtag.entity;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "feed_hashtags")
public class FeedHashtag {

    @Id
    @GeneratedValue
    @Column(name = "feed_hashtag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

}
