package com.palette.palette.domain.challenge.service;

import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.dto.detail.ChallengeDetailResDto;
import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.follow.repository.FollowRepository;
import com.palette.palette.domain.like.repository.ChallengeLikeRepository;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChallengeService {

    private final ChallengeRepository challengeRepository;
    private final ChallengeLikeRepository challengeLikeRepository;
    private final UserRepository userRepository;
    private final FollowRepository followRepository;


    /**
     * 챌린지 목록 조회
     * @param page
     * @param size
     */
    public List<ChallengeResDto> list(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        return challengeRepository.findAllByDelete(pageable).getContent().stream()
                .map(ChallengeResDto::toDto)
                .collect(Collectors.toList());
    }


    /**
     * 챌린지 인기 조회
     */
    public List<ChallengeResDto> best() {
        return challengeRepository.findAllByBest().stream()
                .map(ChallengeResDto::toDto)
                .collect(Collectors.toList());
    }


    /**
     * 챌린지 생성
     * @param challengeCreateReqDto
     * @param user
     */
    @Transactional
    public void create(ChallengeCreateReqDto challengeCreateReqDto, User user) {

        Challenge challenge = Challenge.toEntity(challengeCreateReqDto, user);

        challengeRepository.save(challenge);
    }

    /**
     * 챌린지 상세 조회
     * @param challengeId
     */
    public ChallengeDetailResDto detail(Long challengeId, Long userId) {

        // 유저 유효성 검사
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자가 없습니다."));

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("해당 챌린지를 찾을 수 없습니다."));

        // 사용자가 해당 피드를 좋아요 했는지 체크
        Boolean isLiked = false;
        if (challengeLikeRepository.findByChallengeAndUser(challenge, user).isPresent()) {
            isLiked = true;
        }

        // 사용자가 피드 작성자를 팔로우 했는지 체크
        Boolean isFollowingAuthor = false;
        if (challenge.getUser().getId().equals(userId)) {
            // If the feed's author is the same as the current user, consider them as following themselves
            isFollowingAuthor = true;
        } else {
            List<Follow> currentUserFollowers = followRepository.findByFromUser(user.getEmail());
            if (currentUserFollowers.stream().anyMatch(follow -> follow.getToUser().equals(challenge.getUser().getEmail()))) {
                isFollowingAuthor = true;
            }
        }

        return ChallengeDetailResDto.toDto(challenge, isLiked, isFollowingAuthor);
    }

    /**
     * 챌린지 수정
     * @param dto
     * @param challengeId
     */
    @Transactional
    public void update(ChallengeCreateReqDto dto, Long challengeId) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("해당 챌린지가 없습니다."));

        challenge.update(dto);
        challengeRepository.save(challenge);
    }

    /**
     * 챌린지 삭제
     * @param challengeId
     */
    @Transactional
    public void delete(Long challengeId) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("해당 챌린지를 찾을 수 없습니다."));

        challengeRepository.deleteById(challengeId);
        challenge.delete();
    }
}
