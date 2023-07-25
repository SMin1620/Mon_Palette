package com.palette.palette.domain.feed.entity;

import com.palette.palette.domain.feed.dto.FeedReqDto;
import com.palette.palette.domain.feed.dto.FeedResDto;
import com.palette.palette.domain.hashtag.entity.Hashtag;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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

    @Column(nullable = false)
    private String content;

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
//    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
//    private List<Hashtag> hashtags;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;


    //  dto -> entity
    public static Feed toEntity(FeedReqDto request) {

        return Feed.builder()
                .content(request.getContent())
//                .user() // 토큰에서 가져오기
//                .hashtags() // 해시 태그 비즈니스 로직
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .build();

    }

    /**
     * 피드 이미지 생성 메서드
     */
    public void addFeedImage(FeedImage feedImage) {
        feedImages.add(feedImage);
        feedImage.setFeed(this);
    }

}
