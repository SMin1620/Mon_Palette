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
    private Long id;

    @Column(name = "to_user")
    private String toUser;

    @Column(name = "from_user")
    private String fromUser;

    public Follow(String toUser, String fromUser){
        this.toUser = toUser;
        this.fromUser = fromUser;
    }


}
