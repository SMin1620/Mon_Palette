package com.palette.palette.domain.follow.repository;

import com.palette.palette.domain.follow.dto.FollowerListDto;
import com.palette.palette.domain.follow.entity.Follow;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    Optional<Follow> findByFromUserAndToUser(String fromUser, String toUser); // 팔로우 관계
    String countByFromUser(String userEmail); // follower 수
    String countByToUser(String userEmail); // following 수

    @Query(value = "select u from Follow f inner join User u on f.fromUser = u.email where f.toUser = :userEmail")
    List<User> findAllByToUser(@Param("userEmail") String userEmail); // 사용자를 팔로우하는 관게를 가져옴

    @Query(value = "select u from Follow f inner join User u on f.toUser = u.email where f.fromUser = :userEmail")
    List<User> findAllByFromUser(@Param("userEmail") String userEmail); // 사용자가 팔로우한 관계를 가져옴

    Boolean existsByFromUserAndToUser(String fromUserEmail, String toUserEmail);

    void deleteAllByFromUser(String userEmail); // 탈퇴하면 다 지워야함

    void deleteAllByToUser(String userEmail); // 탈퇴하면 다 지워야함



    List<Follow> findByFromUser(String fromUser);

}
