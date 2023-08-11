package com.palette.palette.domain.category.service;

import com.palette.palette.domain.category.dto.CategoryCreateReq;
import com.palette.palette.domain.category.dto.CategoryDto;
import com.palette.palette.domain.category.entity.Category;
import com.palette.palette.domain.category.repository.CategoryRepository;
import com.palette.palette.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public List<CategoryDto> readAll(){
        List<Category> categories = categoryRepository.findAllOrderByParentIdAscNullsFirstCategoryIdAsc();
        return CategoryDto.toDtoList(categories);
    }

    @Transactional
    public void createFirst(){
        Category category = new Category("default", null,null);
        categoryRepository.save(category);
    }

    @Transactional
    public void createCategory(CategoryCreateReq req){
        Category parent = Optional.ofNullable(req.getParentId())
                .map(id -> categoryRepository.findById(id).orElseThrow(NullPointerException::new))
                .orElse(null);
        categoryRepository.save(new Category(req.getName(), req.getCategoryPhoto(), parent));
    }
}
