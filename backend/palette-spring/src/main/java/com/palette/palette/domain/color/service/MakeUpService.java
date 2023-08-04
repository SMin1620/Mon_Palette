package com.palette.palette.domain.color.service;

import com.palette.palette.domain.color.entity.MakeUp;
import com.palette.palette.domain.color.repository.MakeUpRepository;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MakeUpService {

    private final MakeUpRepository makeUpRepository;


    @Value("${spring.servlet.multipart.location}")
    private String uploadDir;


    /**
     * 메이크업 쌩얼 이미지 업로드
     */
    @Transactional
    public void upload(User user, MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String imageName = UUID.randomUUID().toString() + "_" + originalFilename.replace("-", ".");
        Path imagePath = Paths.get(uploadDir, imageName);

        // 업로드 디렉토리가 존재하지 않으면 생성
        if (!Files.exists(imagePath)) {
            Files.createDirectories(imagePath);
        }

        // 파일 복사
        Files.copy(file.getInputStream(), imagePath);

        MakeUp makeUp = MakeUp.builder()
                .imageName(file.getOriginalFilename())
                .imagePath(imagePath.toString())
                .user(user)
                .build();

        makeUpRepository.save(makeUp);
    }
}