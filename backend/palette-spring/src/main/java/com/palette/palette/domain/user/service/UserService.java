package com.palette.palette.domain.user.service;

import com.palette.palette.domain.challenge.dto.detail.ChallengeDetailResDto;
import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedRepository;
import com.palette.palette.domain.follow.repository.FollowRepository;
import com.palette.palette.domain.user.dto.info.Info;
import com.palette.palette.domain.user.dto.login.LoginReqDto;
import com.palette.palette.domain.user.dto.userpage.UserPage;
import com.palette.palette.domain.user.dto.register.RegisterReqDto;
import com.palette.palette.domain.user.dto.register.RegisterResDto;
import com.palette.palette.domain.user.dto.token.TokenDto;
import com.palette.palette.domain.user.dto.update.*;
import com.palette.palette.domain.user.dto.validation.ValidationResDto;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final RedisTemplate<String, String> redisTemplate;
    private final FollowRepository followRepository;
    private final FeedRepository feedRepository;
    private final ChallengeRepository challengeRepository;

    /**
     * 회원 가입 로직
     */

    @Transactional
    public RegisterResDto signup(RegisterReqDto request){

        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if(!user.isEmpty()) throw new IllegalArgumentException("이미 사용중인 아이디입니다.");

        userRepository.save(User.fromEntity(request, passwordEncoder));

        try{
            userRepository.flush();
        }catch (DataIntegrityViolationException e){
            throw new IllegalArgumentException("이미 사용중인 아이디입니다.");
        }
        return RegisterResDto.builder()
                .check(true)
                .build();
    }

    /**
     * 로그인 로직
     */
    public TokenDto login(
            HttpServletResponse response,
            LoginReqDto loginReqDto
    ){
        Optional<User> userCheck = userRepository.findByEmail(loginReqDto.getEmail());
        if(!userCheck.isEmpty() && userCheck.get().getIsOauth()){
            throw new IllegalArgumentException("소셜 로그인 사용자 입니다.");
        }
        // ================
        try{
            System.out.println("로그인 시작 ");
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginReqDto.getEmail(),
                            loginReqDto.getPassword()
                    )
            );
            log.info("로그인 컨트롤러 에러 >>> " + authentication);

            String accessToken = jwtTokenProvider.createAccessToken(authentication);
            String refreshToken = jwtTokenProvider.createRefreshToken(authentication);

            Optional<User> user = userRepository.findByEmail(loginReqDto.getEmail());

            TokenDto tokenDto =TokenDto.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .userId(user.get().getId())
                    .build();
            // 헤더에 토큰 담기
            jwtTokenProvider.setHeaderAccessToken(response, accessToken);
            jwtTokenProvider.setHeaderRefreshToken(response, refreshToken);

            log.info("토큰Dto 생성 후 에러 >>> " + tokenDto);

            return tokenDto;
        }catch (Exception e){
            e.printStackTrace();
            throw new NullPointerException("로그인 에러");
        }
    }

    /**
     * 리프레시 토큰 발급
     */
    @Transactional
    public TokenDto refresh(
            HttpServletRequest request,
            HttpServletResponse response,
            String authorizationHeader
    ){
        // 1. Request Header 에서 JWT Token 추출
        String token = jwtTokenProvider.resolveToken(request);

        log.info("헤더에서 받아온 토큰 >>> " + token);

        // 2.엑세스 토큰 유효성 검사
        if(token == null || !jwtTokenProvider.validateToken(token)){
            throw new IllegalArgumentException("엑세스 토큰이 잘못 됨");
        }

        // 3. 엑세스 토큰에서 email 가져옴
        String email = jwtTokenProvider.getUserEmail(token);

        log.info("토큰에서 받아온 이메일 >>> " + email);

        // 4. 레디스의 refresh token 을 가져온다.
        String refresh = redisTemplate.opsForValue().get(email);

        System.out.println("refresh token >>> "+ refresh);

        // 5. 레디스의 리프레시 토큰과 요청 리프레시 토큰을 비교
        String headerRefreshToken = jwtTokenProvider.resolveRefreshToken(request);
        System.out.println("header refresh >>> " + headerRefreshToken);
        if(headerRefreshToken == null || !jwtTokenProvider.validateToken(headerRefreshToken)){
            throw new IllegalArgumentException("리프레시 토큰이 잘못 됨");
        }

        // 6. 엑세스 토큰 재발급 :: 리프레시 토큰은 재발급 하지 않을 것임.
        Optional<User> user = userRepository.findByEmail(email);
        Authentication authentication = jwtTokenProvider.getAuthenticationByUsername(user.get().getEmail());

        String newAccessToken = jwtTokenProvider.createAccessToken(authentication);

        // 7. 토큰 헤더에 담기
        jwtTokenProvider.setHeaderRefreshToken(response, newAccessToken);
        jwtTokenProvider.setHeaderRefreshToken(response, headerRefreshToken);

        // 8. 토큰 생성
        TokenDto tokenDto = TokenDto.builder()
                .accessToken(newAccessToken)
                .refreshToken(headerRefreshToken)
                .build();
        return tokenDto;
    }

    public ValidationResDto emailValidation(String email){
        Optional<User> emailCheck = userRepository.findByEmail(email);
        if(emailCheck.isEmpty()){
            return ValidationResDto.builder().check(true).build();
        }else{
            return ValidationResDto.builder().check(false).build();
        }
    }

    public ValidationResDto nicknameValidation(String nickname){
        Optional<User> nicknameCheck = userRepository.findByNickname(nickname);
        if(nicknameCheck.isEmpty()){
            return ValidationResDto.builder().check(true).build();
        }else{
            return ValidationResDto.builder().check(false).build();
        }
    }

    public ValidationResDto phoneValidation(String phone){
        Optional<User> phoneCheck = userRepository.findByPhone(phone);
        if(phoneCheck.isEmpty()){
            return ValidationResDto.builder().check(true).build();
        }else{
            return ValidationResDto.builder().check(false).build();
        }
    }

    /**
     *
     * 비밀번호 수정
     */
    @Transactional
    public UpdateResDto passwordUpdate(PasswordUpdateReqDto passwordUpdateReqDto, HttpServletRequest req){

        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        System.out.println("userEmail = " + userEmail);
        Optional<User> user = userRepository.findByEmail(userEmail);
        System.out.println("user = " + user);
        user.get().updatePwd(passwordEncoder.encode(passwordUpdateReqDto.getPassword()));
//        userRepository.save(user.get());
//        userRepository.flush();
        return UpdateResDto.builder().update(true).build();
    }
    /**
     * 닉네임 수정
     */
    @Transactional
    public UpdateResDto nicknameUpdate(NicknameUpdateReqDto nicknameUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updateNickname(nicknameUpdateReqDto.getNickname());
        return UpdateResDto.builder().update(true).build();
    }

    /**
     * 퍼스널 컬러 수정
     */
    @Transactional
    public UpdateResDto personalColorUpdate(PersonalUpdateReqDto personalUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updatePersonalColor(personalUpdateReqDto.getPersonalColor());
        return UpdateResDto.builder().update(true).build();
    }

    /**
     * 배경사진 수정
     */
    @Transactional
    public UpdateResDto backgroundUpdate(BackgroundUpdateReqDto backgroundUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updateBackground(backgroundUpdateReqDto.getBackgroundImage());
        return UpdateResDto.builder().update(true).build();
    }
    /**
     * 프로필사진 수정
     */
    @Transactional
    public UpdateResDto profileUpdate(ProfileUpdateReqDto profileUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updateProfile(profileUpdateReqDto.getProfileImage());
        return UpdateResDto.builder().update(true).build();
    }
    /**
     * 휴대폰번호 수정
     */
    @Transactional
    public UpdateResDto phoneUpdate(PhoneUpdateReqDto phoneUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updatePhone(phoneUpdateReqDto.getPhone());
        return UpdateResDto.builder().update(true).build();
    }

    /**
     * 주소지 수정
     */
    @Transactional
    public UpdateResDto addressUpdate(AddressUpdateReqDto addressUpdateReqDto, HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().updateAddress(addressUpdateReqDto.getAddress());
        return UpdateResDto.builder().update(true).build();
    }

    /**
     * 개인정보 수정 페이지
     */
    public Info userInfo(HttpServletRequest req){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);
        return Info.builder()
                .address(user.get().getAddress())
                .phone(user.get().getPhone())
                .personalcolr(user.get().getPersonalColor())
                .nickname(user.get().getNickname())
                .background(user.get().getBackgroundImage())
                .profilePhoto(user.get().getProfileImage())
                .build();
    }
    /**
     * 유저페이지
     */
    public UserPage userPage(HttpServletRequest req, Long pathUserId){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> user = userRepository.findByEmail(userEmail);

        Optional<User> user2 = userRepository.findById(pathUserId);

        String followingCnt = followRepository.countByFromUser(user2.get().getEmail());
        String followerCnt = followRepository.countByToUser(user2.get().getEmail());
//        List<Feed> feedList = feedRepository.findAllByUser(user2.get());
        List<FeedResDto> feedList = feedRepository.findAllByUser(user2.get()).stream()
                .map(FeedResDto::toDto)
                .collect(Collectors.toList());
        List<ChallengeResDto> challengeResDtoList = challengeRepository.findByUser(user2.get())
                .stream()
                .map(ChallengeResDto::toDto)
                .collect(Collectors.toList());
        if(user.get().getId().equals(pathUserId)){
            return UserPage.builder()
                    .isMe(true)
                    .isFollow(false)
                    .email(user2.get().getEmail())
                    .profilePhoto(user2.get().getProfileImage())
                    .background(user2.get().getBackgroundImage())
                    .nickname(user2.get().getNickname())
                    .isInfluence(user2.get().getRole())
                    .personalColor(user2.get().getPersonalColor())
                    .followingCnt(followingCnt)
                    .followerCnt(followerCnt)
                    .feedCnt(feedList.size())
                    .isOauth(user2.get().getIsOauth())
                    .feed(feedList)
                    .challengeResDtoList(challengeResDtoList)
                    .build();
        }else{
            return UserPage.builder()
                    .isMe(false)
                    .isFollow(followRepository.existsByFromUserAndToUser(userEmail, user2.get().getEmail()))
                    .email(user2.get().getEmail())
                    .profilePhoto(user2.get().getProfileImage())
                    .background(user2.get().getBackgroundImage())
                    .nickname(user2.get().getNickname())
                    .isInfluence(user2.get().getRole())
                    .personalColor(user2.get().getPersonalColor())
                    .followingCnt(followingCnt)
                    .followerCnt(followerCnt)
                    .feedCnt(feedList.size())
                    .feed(feedList)
                    .challengeResDtoList(challengeResDtoList)
                    .build();
        }


    }



    /**
     * 회원 탈퇴
     */
    @Transactional
    public void deleteUser(HttpServletRequest request){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findByEmail(userEmail);
        followRepository.deleteAllByToUser(user.get().getEmail());
        followRepository.deleteAllByFromUser(user.get().getEmail());
        userRepository.deleteById(user.get().getId());
    }
    @Transactional
    public UpdateResDto upgradeUser(HttpServletRequest request){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        String followerCnt = followRepository.countByToUser(userEmail);
        if(Integer.parseInt(followerCnt) >= 3){
            return UpdateResDto.builder().update(true).build();
        }else{
            return UpdateResDto.builder().update(false).build();
        }
    }
}
