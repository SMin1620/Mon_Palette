package com.palette.palette.domain.item.repository;

import com.palette.palette.domain.item.dto.ItemGetResDto;
import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemCustomRepository {

    @Query("select i from Item i where i.isDelete = false and i.endAt > NOW() order by i.endAt ASC")
    Page<Item> findAllOrderByEndAtAsc(Pageable pageable);

    Optional<Item> findById(Long id);

    @Query("select i from Item i where i.user.email = :userEmail")
    List<Item> findByUserEmail(@Param("userEmail") String userEmail);

}
