package com.palette.palette.domain.follow.service;

import com.palette.palette.domain.follow.dto.FollowCntDto;
import com.palette.palette.domain.follow.dto.FollowerListDto;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.follow.repository.FollowRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class FollowService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 팔로우
     */
    @Transactional
    public String followUser(HttpServletRequest req, Long toUserId){
        String fromUserEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        Optional<User> fromUser = userRepository.findByEmail(fromUserEmail);
        Optional<User> toUser = userRepository.findById(toUserId);
        if(fromUser.get().getId().equals(toUserId)){
            throw new IllegalArgumentException("자기 자신을 팔로우할 수 없습니다.");
        }
        Optional<Follow> follow = followRepository.findByFromUserAndToUser(fromUser.get().getEmail(), toUser.get().getEmail());
        System.out.println(follow);
        if (follow.isEmpty()){
          Follow addFollow = Follow.builder()
                  .fromUser(fromUser.get().getEmail())
                  .toUser(toUser.get().getEmail())
                  .build();
          followRepository.save(addFollow);
          return "팔로우 성공";
        }else{
            followRepository.delete(follow.get());
            return "팔로우 취소";
        }
    }
    public List<FollowerListDto> getFollowerList(HttpServletRequest req, Long userId){
        Optional<User> user = userRepository.findById(userId);

        String meEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));


        List<User> followerListDto = followRepository.findAllByToUser(user.get().getEmail());
        List<FollowerListDto> followerList = new ArrayList<>();
        for(User u : followerListDto){
            Boolean isme = meEmail.equals(u.getEmail());
            Boolean checkFollow = followRepository.existsByFromUserAndToUser(u.getEmail(),meEmail);
            String isfollow;
            if(checkFollow == true){
                isfollow = "unfollow";
            }else{
                isfollow = "follow";
            }
            followerList.add(FollowerListDto.toDto(u, isme, isfollow));
        }
        return followerList;
    }

    public List<FollowerListDto> getFollowingList(HttpServletRequest req, Long userId){
        Optional<User> user = userRepository.findById(userId);

        String meEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(req));
        List<User> followerListDto = followRepository.findAllByFromUser(user.get().getEmail());
        List<FollowerListDto> followerList = new ArrayList<>();
        for(User u : followerListDto){
            Boolean isme = meEmail.equals(u.getEmail());
            Boolean checkFollow = followRepository.existsByFromUserAndToUser(meEmail, u.getEmail());
            String isfollow;
            if(checkFollow == true){
                isfollow = "unfollow";
            }else{
                isfollow = "follow";
            }
            followerList.add(FollowerListDto.toDto(u, isme, isfollow));
        }
        return followerList;
    }

    public FollowCntDto followCnt(String userId){
        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        String toUser = followRepository.countByToUser(user.get().getEmail());
        String fromUser = followRepository.countByFromUser(user.get().getEmail());
        FollowCntDto followCntDto = new FollowCntDto(toUser, fromUser);
        return followCntDto;
    }
    public Boolean isFollow(HttpServletRequest request, String followId){
        String userEmail = jwtTokenProvider.getUserEmail(jwtTokenProvider.resolveToken(request));
        Optional<User> user = userRepository.findById(Long.parseLong(followId));
        if(!userEmail.isEmpty()){
            return followRepository.existsByFromUserAndToUser(userEmail, user.get().getEmail());
        }else{
            throw new IllegalArgumentException("존재하지 않는 사용자입니다.");
        }
    }

}
