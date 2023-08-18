package com.palette.palette.domain.makeup.service;

import com.palette.palette.domain.makeup.dto.makeup.MakeUpListResDto;
import com.palette.palette.domain.makeup.entity.MakeUp;
import com.palette.palette.domain.makeup.entity.MakeUpImage;
import com.palette.palette.domain.makeup.repository.MakeUpImageRepository;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MakeUpService {

    private final MakeUpImageRepository makeUpImageRepository;



    /**
     * 메이크업 샘플 이미지 목록 조회
     */
    public List<MakeUpListResDto> makeupList(String personalColor) {

        if (personalColor == null) throw new IllegalArgumentException("해당 사용자는 퍼스널컬러 진단을 하지 않았습니다.");

        return makeUpImageRepository.findAllByMakeUp(personalColor).stream()
                .map(MakeUpListResDto::toDto)
                .collect(Collectors.toList());
    }
}