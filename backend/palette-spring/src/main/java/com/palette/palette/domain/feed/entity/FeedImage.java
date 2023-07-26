package com.palette.palette.domain.feed.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.palette.palette.domain.feed.dto.image.FeedImageReqDto;
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

    // 피드 - 피드 이미지
    @JsonIgnore // @JsonManagedReference, @JsonBackReference 를 사용해서 무한 루프 해결할 수도 있음.
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

}
