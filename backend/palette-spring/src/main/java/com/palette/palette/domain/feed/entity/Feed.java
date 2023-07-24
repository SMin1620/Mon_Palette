package com.palette.palette.domain.feed.entity;

import com.palette.palette.domain.hashtag.entity.Hashtag;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "feeds")
public class Feed {

    @Id
    @GeneratedValue
    @Column(name = "feed_id")
    private Long id;

    // 피드 이미지 리스트
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<FeedImage> feedImages = new ArrayList<>();

    // 유저 - 피드 :: 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 좋아요 컬럼

    // 댓글 - 피드 추가해야함.

    // 피드 - 해시태그 :: 양방향
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    private List<Hashtag> hashtags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;


    //  dto -> entity

}
