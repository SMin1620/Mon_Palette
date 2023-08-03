package com.palette.palette.domain.category.repository;

import com.palette.palette.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {


    @Query("SELECT c from Category c LEFT JOIN c.parent p order by p.id ASC nulls first , c.id ASC ")
    List<Category> findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
}
