package com.palette.palette.domain.feed.entity;

import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

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
    private String image;

    // 해시태그 컬럼 추가 해야함.

    // 좋아요 컬럼 추가 해야함.

    // 유저 - 피드
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    private Boolean isDelete;

    private LocalDateTime deleteAt;


    //  dto -> entity

}
