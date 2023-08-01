package com.palette.palette.domain.user.repository;

import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    Optional<User> findByNickname(String nickname);

    Optional<User> findByPhone(String phone);

}
