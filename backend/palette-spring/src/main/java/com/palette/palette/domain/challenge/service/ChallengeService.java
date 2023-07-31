package com.palette.palette.domain.challenge.service;

import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.dto.detail.ChallengeDetailResDto;
import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
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
    private final UserRepository userRepository;


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
    public ChallengeDetailResDto detail(Long challengeId, Long currentUserId) {

        Challenge challenge = challengeRepository.findById(challengeId)
                .orElseThrow(() -> new NotFoundException("해당 챌린지를 찾을 수 없습니다."));

        return ChallengeDetailResDto.toDto(challenge);
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
