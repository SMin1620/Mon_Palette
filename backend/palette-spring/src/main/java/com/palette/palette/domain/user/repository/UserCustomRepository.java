package com.palette.palette.domain.user.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserCustomRepository {

    Page<User> findBySearchOption(Pageable pageable, String content, String orderBy, String color);

}
