package com.palette.palette.domain.challenge.service;

import com.palette.palette.domain.challenge.dto.create.ChallengeCreateReqDto;
import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeRepository;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChallengeService {

    private final ChallengeRepository challengeRepository;


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
    public void create(ChallengeCreateReqDto challengeCreateReqDto, User user) {

        Challenge challenge = Challenge.toEntity(challengeCreateReqDto, user);

        challengeRepository.save(challenge);
    }

}
