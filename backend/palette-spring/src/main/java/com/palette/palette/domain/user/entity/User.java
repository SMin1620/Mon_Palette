package com.palette.palette.domain.user.entity;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;


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

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String birth;

    @Column(unique = true, nullable = false)
    private String phone;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private LocalDateTime createAt;
    private LocalDateTime modifiedAt;

    @Column(nullable = false)
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

    // 피드 - 유저 :: 양방향
    @OneToMany(mappedBy = "user")
    private List<Feed> feed;
    
    // 리프레시 토큰
    private String refreshToken;

    /**
     * 회원 가입 로직
     */
    public static  User fromEntity(RegisterReqDto request, PasswordEncoder encoder){
        return User.builder()
                .email(request.getEmail())
                .password(encoder.encode(request.getPassword()))
                .name(request.getName())
                .birth(request.getBirth())
                .phone(request.getPhone())
                .gender(request.getGender())
                .createAt(LocalDateTime.now())
                .role(Role.USER)
                .isLeave(false)
                .nickname(request.getNickname())
                .build();
    }
    /**
     * 회원가입 :: 비밀번호 암호화 적용
     */

    /**
     * 리프레시 토큰
     */
    
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    /**
     * 비밀번호 수정
     */
    public void updatePwd(String newPwd){
        this.password = newPwd;
    }

}
