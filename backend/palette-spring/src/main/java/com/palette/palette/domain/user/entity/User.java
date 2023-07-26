package com.palette.palette.domain.user.entity;

import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private String birth;

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


}
