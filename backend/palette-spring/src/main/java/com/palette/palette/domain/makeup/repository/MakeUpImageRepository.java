package com.palette.palette.domain.makeup.repository;

import com.palette.palette.domain.makeup.entity.MakeUpImage;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MakeUpImageRepository extends JpaRepository<MakeUpImage, Long> {

    @Query("select mi from MakeUpImage mi where mi.makeUp.name = :color")
    List<MakeUpImage> findAllByMakeUp(String color);
}
