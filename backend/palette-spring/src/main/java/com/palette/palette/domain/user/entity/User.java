package com.palette.palette.domain.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = true, nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private LocalDateTime birth;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(nullable = false)
    private String gender;

    @Column(unique = true, nullable = false)
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;
    private Boolean isLeave;
    private LocalDateTime leaveAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(unique = true, nullable = false)
    private String nickname;
    private String personalColor;
    private String profileImage;
    private String backgroundImage;
}
