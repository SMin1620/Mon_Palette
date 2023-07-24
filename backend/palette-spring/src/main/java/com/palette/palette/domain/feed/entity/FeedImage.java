package com.palette.palette.domain.feed.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "feed_images")
public class FeedImage {

    @Id
    @GeneratedValue
    @Column(name = "feed_image_id")
    private Long id;

    // 이미지 저장 경로
    @Column(nullable = false)
    private String imagePath;

    // 피드
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

}
