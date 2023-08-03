package com.palette.palette.domain.itemDetailPhoto.repository;

import com.palette.palette.domain.itemDetailPhoto.entity.ItemDetailPhoto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemDetailPhotoRepository extends JpaRepository<ItemDetailPhoto, Long> {

//    List<ItemDetailPhoto> findAll();
}
