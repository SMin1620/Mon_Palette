package com.palette.palette.domain.itemOption.repository;

import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemOptionRepository extends JpaRepository<ItemOption, Long> {

    List<ItemOption> findByItem(Item item);
}
