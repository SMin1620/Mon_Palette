package com.palette.palette.domain.like.service;


import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.like.entity.ChallengeLike;
import com.palette.palette.domain.like.repository.ChallengeLikeRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Not;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChallengeLikeService {

    private final UserRepository userRepository;
    private final ChallengeRepository challengeRepository;
    private final ChallengeLikeRepository challengeLikeRepository;


    /**
     * 챌린지 좋아요
     */
    @Transactional
    public void like(Long challengeId, Long userId) throws Exception {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        // 챌린지 유효성 검사
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("챌린지가 없습니다."));

        // 이미 좋아요 되었는지 확인
        if (challengeLikeRepository.findByChallengeAndUser(challenge, user).isPresent()) {
            throw new Exception("이미 좋아요 되었습니다.");
        }

        ChallengeLike challengeLike = ChallengeLike.builder()
                .challenge(challenge)
                .user(user)
                .build();

        challengeLikeRepository.save(challengeLike);

        challenge.addLike();
    }

    /**
     * 챌린지 좋아요 취소
     * @param challengeId
     * @param userId
     */
    @Transactional
    public void unLike(Long challengeId, Long userId) {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        // 챌린지 유효성 검사
        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("챌린지가 없습니다."));

        challengeLikeRepository.delete(challengeLikeRepository.findByChallengeAndUser(challenge, user)
                .orElseThrow(() -> new NotFoundException("이미 좋아요를 취소했습니다.")));

        challenge.cancelLike();
    }
}
