package com.palette.palette.domain.hashtag.entity;

import com.palette.palette.domain.feed.entity.Feed;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hashtags")
public class Hashtag {

    @Id
    @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

}
