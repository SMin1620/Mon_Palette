package com.palette.palette.domain.item.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ItemCustomRepository {

    Page<Item> findBySearchOption(Pageable pageable, String content, String orderBy, String color);

}
