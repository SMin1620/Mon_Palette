package com.palette.palette.domain.categoryitemlist.repository;

import com.palette.palette.domain.category.entity.Category;
import com.palette.palette.domain.categoryitemlist.entity.CategoryProductList;
import com.palette.palette.domain.item.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryProductListRepository extends JpaRepository<CategoryProductList, Long> {


    @Query("select c from CategoryProductList c where c.category.parent = :category and c.item.isDelete = false")
    Page<CategoryProductList> findByCategory(@Param("category") Category category, Pageable pageable);

}
