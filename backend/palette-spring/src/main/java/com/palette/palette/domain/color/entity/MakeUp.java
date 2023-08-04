package com.palette.palette.domain.color.entity;


import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "makeups")
public class MakeUp {

    @Id
    @GeneratedValue
    @Column(name = "makeup_id")
    private Long id;

    private String imageName;

    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
