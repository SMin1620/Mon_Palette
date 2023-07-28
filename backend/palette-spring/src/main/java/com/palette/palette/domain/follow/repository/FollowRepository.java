package com.palette.palette.domain.follow.repository;

import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Follow findByFromUserAndToUser(User fromUser, User toUser);
    Long countByFromUser(String userEmail); // follower 수
    Long countByToUser(String userEmail); // following 수

    List<Follow> findAllByToUser(String userEmail);
    List<Follow> findAllByFromUser(String userEmail);

    Boolean existsByFromUserAndToUser(User fromUser, User toUser);





}
