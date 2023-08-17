package com.palette.palette.domain.user.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.user.dto.oauth.UserOauthDto;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE users SET is_leave = true, leave_at = CURRENT_TIMESTAMP where user_id = ? ") // delete 쿼리가 발생하면 해당 쿼리가 대신 실행
@Where(clause = "is_leave = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(nullable = false)
    private String email;


    private String password;

    @Column(nullable = false)
    private String name;

    private String birth;

    private String phone;

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

    @Column(nullable = false)
    private String nickname;
    private String personalColor;
    @Column(length = 5000)
    private String profileImage;
    @Column(length = 5000)
    private String backgroundImage;

    private Boolean isOauth = false;

    // 피드 - 유저 :: 양방향
//    @OneToMany(mappedBy = "user")
//    @JsonIgnore
//    private List<Feed> feed;

//    @OneToMany(mappedBy = "fromUser")
//    private List<Follow> follower;
//
//    @OneToMany(mappedBy = "toUser")
//    private List<Follow> following;
    
    // 리프레시 토큰
    private String refreshToken;

    private String address;
    /**
     * oauth 회원 가입 로직
     */
    public static User fromOauthEntity(UserOauthDto userOauthDto, PasswordEncoder encoder){
        return User.builder()
                .email(userOauthDto.getEmail())
                .password(encoder.encode(userOauthDto.getEmail()))
                .name(userOauthDto.getName())
                .createAt(LocalDateTime.now())
                .role(Role.USER)
                .isLeave(false)
                .nickname(userOauthDto.getName())
                .backgroundImage("https://ssafy9-monpalette.s3.ap-northeast-2.amazonaws.com/background.jpg")
                .profileImage("https://ssafy9-monpalette.s3.ap-northeast-2.amazonaws.com/baseimg.png")
                .isOauth(true)
                .build();
    }

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
                .address(null)
                .nickname(request.getNickname())
                .backgroundImage("https://ssafy9-monpalette.s3.ap-northeast-2.amazonaws.com/background.jpg")
                .profileImage("https://ssafy9-monpalette.s3.ap-northeast-2.amazonaws.com/baseimg.png")
                .isOauth(false)
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

    /**
     * 닉네임 수정
     */
    public void updateNickname(String newNickname){this.nickname = newNickname;}

    /**
     * 퍼스널 컬러 수정
     */
    public void updatePersonalColor(String newPersonalColor) {this.personalColor = newPersonalColor;}

    /**
     * 전화번호 수정
     */
    public void updatePhone(String newPhone){this.phone = newPhone;}

    /**
     * 배경사진 수정
     */
    public void updateBackground(String newBackground) {this.backgroundImage = newBackground;}

    /**
     * 프로필이미지 수정
     */
    public void updateProfile(String newProfile) {this.profileImage = newProfile;}

    /**
     * 주소지 수정
     */
    public void updateAddress(String newAddress){this.address = newAddress;}


}
