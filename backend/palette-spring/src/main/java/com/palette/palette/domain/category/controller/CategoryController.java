package com.palette.palette.domain.category.controller;


import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.category.dto.CategoryCreateReq;
import com.palette.palette.domain.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@Tag(name = "카테고리 api")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "모든 카테고리 조회")
    @GetMapping("/All")
    public BaseResponse readAll(HttpServletRequest request){
        try{
            return BaseResponse.success(categoryService.readAll());
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카테고리 조회에 실패 하였습니다.");
        }
    }

    @Operation(summary = "카테고리 처음 생성")
    @PostMapping("/start")
    public BaseResponse createCategoryFirst(){

        try{
            categoryService.createFirst();
            return BaseResponse.success("true");
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("fail");
        }
    }

    @Operation(summary = "카테고리 추가")
    @PostMapping("/regist")
    public BaseResponse createCategory(@RequestBody @Valid CategoryCreateReq req){
        try{
            categoryService.createCategory(req);
            return BaseResponse.success("good");
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카테고리 추가 실패");
        }

    }
}
