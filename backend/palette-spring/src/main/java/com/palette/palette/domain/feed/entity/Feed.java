package com.palette.palette.domain.feed.entity;

import com.palette.palette.domain.feed.dto.list.FeedReqDto;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
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


    /**
     * 피드 이미지 생성 메서드
     */
    public void addFeedImage(FeedImage feedImage) {
        System.out.println("add feed image");
        System.out.println("feedImage >>> " + feedImage.getImagePath());
        feedImages.add(feedImage);
        feedImage.setFeed(this);

        System.out.println("feedImages >>> " + this.feedImages);
    }


    /**
     * dto -> entity
     * @param feedReqDto
     * @param feedImageReqDtos
     */
    public static Feed toEntity(FeedReqDto feedReqDto, List<FeedImageReqDto> feedImageReqDtos) {

        // 피드 생성
        Feed feed = Feed.builder()
                .content(feedReqDto.getContent())
//                .user() // 토큰에서 가져오기
//                .hashtags() // 해시 태그 비즈니스 로직
                .createAt(LocalDateTime.now())
                .isDelete(false)
                .build();

        // 피드 이미지 생성
        List<FeedImage> feedImageList = new ArrayList<>();
        for (FeedImageReqDto feedImageReqDto : feedImageReqDtos) {
            FeedImage feedImage = FeedImage.builder()
                    .feed(feed)
                    .imagePath(feedImageReqDto.getFeedImage())
                    .build();

            feedImageList.add(feedImage);

            System.out.println("feedImage >>> " + feedImage.getImagePath());

        }

        feed.setFeedImages(feedImageList);

        return feed;
    }

    /**
     * feed update
     */
    public static Feed update(Long feedId, FeedReqDto feedReqDto) {

        return Feed.builder()
                .content(feedReqDto.getContent())
                .updateAt(LocalDateTime.now())
                .feedImages(feedReqDto.getFeedImages())
                .build();
    }

//    public static FeedImage toEntity(String imagePath, Feed feed) {
//
//        // 피드 이미지 생성
//        FeedImage feedImage = FeedImage.builder()
//                .imagePath(imagePath)
//                .feed(feed)
//                .build();
//
//        System.out.println("image toEntity >>> " + feedImage.getImagePath());
//
//        // 피드에 피드 이미지 add
//        feed.addFeedImage(feedImage);
//
//        return feedImage;
//    }



}
