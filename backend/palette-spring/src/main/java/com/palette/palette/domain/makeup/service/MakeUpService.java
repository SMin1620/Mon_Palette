package com.palette.palette.domain.makeup.service;

import com.palette.palette.domain.makeup.dto.makeup.MakeUpListResDto;
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
    public List<MakeUpListResDto> list(User user) {

        List<MakeUpImage> makeUpImageList = makeUpImageRepository.findAllByMakeUp(user.getPersonalColor());

        for (MakeUpImage image : makeUpImageList) {
            System.out.println("image >>> " + image);
        }

        return makeUpImageList.stream()
                .map(MakeUpListResDto::toDto)
                .collect(Collectors.toList());
    }
}