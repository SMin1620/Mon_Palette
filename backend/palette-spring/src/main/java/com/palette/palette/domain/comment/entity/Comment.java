package com.palette.palette.domain.comment.entity;


import com.palette.palette.domain.comment.dto.create.CommentCreateReqDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue
    @Column(name = "comment_id")
    private Long id;

    @Column(nullable = false)
    private String content;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;


    /**
     * dto -> entity
     */
    public static Comment toEntity(CommentCreateReqDto commentCreateReqDto, Feed feed, User user) {

        return Comment.builder()
                .content(commentCreateReqDto.getContent())
                .createAt(LocalDateTime.now())
                .feed(feed)
                .user(user)
                .build();
    }

    /**
     * 수정
     * @param request
     */
    public void update(CommentCreateReqDto request) {
        this.content = request.getContent();
        this.updateAt = LocalDateTime.now();
    }
}
