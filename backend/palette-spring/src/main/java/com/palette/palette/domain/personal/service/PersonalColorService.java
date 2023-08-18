package com.palette.palette.domain.personal.service;

import com.palette.palette.domain.personal.dto.PersonalColorUserDto;
import com.palette.palette.domain.user.entity.User;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PersonalColorService {

    private final UserRepository userRepository;


    @Transactional
    public void personalColor(PersonalColorUserDto personalColorUserDto, User user) {

        user.setPersonalColor(personalColorUserDto.getPersonalColor());
        userRepository.save(user);
    }

}
