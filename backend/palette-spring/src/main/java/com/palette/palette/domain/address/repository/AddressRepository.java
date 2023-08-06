package com.palette.palette.domain.address.repository;

import com.palette.palette.domain.address.entity.Address;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    @Query("select a from Address a where a.user.id = :userId order by a.isMain DESC")
    List<Address> findByUserId(@Param("userId") Long userId);

}
