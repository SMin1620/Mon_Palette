package com.palette.palette.domain.itemPhoto.repository;

import com.palette.palette.domain.itemPhoto.entity.ItemPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemPhotoRepository extends JpaRepository<ItemPhoto, Long> {

    List<ItemPhoto> findAll();
}
