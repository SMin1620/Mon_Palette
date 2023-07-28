package com.palette.palette.domain.follow.entity;

import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.bind.annotation.GetMapping;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "follow")
public class Follow {

    @Id
    @GeneratedValue
    @Column(name = "follow_id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User toUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User fromUser;

    public Follow(User toUser, User fromUser){
        this.toUser = toUser;
        this.fromUser = fromUser;
    }


}
