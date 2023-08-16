package com.palette.palette.domain.makeup.repository;

import com.palette.palette.domain.makeup.entity.MakeUp;
import com.palette.palette.domain.makeup.entity.MakeUpImage;
import com.palette.palette.domain.user.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MakeUpImageRepository extends JpaRepository<MakeUpImage, Long> {

    @Query("select m from MakeUp m where m.color.name = :personalColor")
    List<MakeUp> findAllByMakeUp(@Param("personalColor") String personalColor);
}
