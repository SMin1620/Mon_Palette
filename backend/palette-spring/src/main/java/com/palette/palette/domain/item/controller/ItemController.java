package com.palette.palette.domain.item.controller;


import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.item.dto.ItemAddReqDto;
import com.palette.palette.domain.item.dto.ItemUpdateReqDto;
import com.palette.palette.domain.item.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.BitSet;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/item")
@Tag(name = "아이템 API")
public class ItemController {

    private final ItemService itemService;

    @Operation(summary = "아이템 등록")
    @PostMapping("/regist")
    public BaseResponse registItem(HttpServletRequest request, @RequestBody ItemAddReqDto itemAddReqDto){
        try{
            return BaseResponse.success(itemService.registItem(request, itemAddReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("아이템 등록에 실패했습니다.");
        }
    }
    @Operation(summary = "아이템 조회")
    @GetMapping("")
    public BaseResponse getItem(@RequestParam("page") int page){
        try{
            return BaseResponse.success(itemService.getItem(page, 10));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("아이템 조회에 실패했습니다.");
        }
    }

    @Operation(summary = "아이템 수정")
    @PutMapping("/{id}")
    public BaseResponse updateItem(
            HttpServletRequest request,
            @PathVariable("id") Long id ,
            @RequestBody @Valid ItemUpdateReqDto itemUpdateReqDto
    ){
        try{
            return BaseResponse.success(itemService.updateItem(request, id, itemUpdateReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("상품 수정이 실패하였습니다.");
        }

    }

    @Operation(summary = "아이템 삭제")
    @DeleteMapping("/{id}")
    public BaseResponse deleteItem(
        HttpServletRequest request,
        @PathVariable("id") Long id
    ){
        try{
            return BaseResponse.success(itemService.deleteItem(request, id));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("상품 삭제에 실패했습니다.");
        }
    }

    @Operation(summary = "아이템 상세 조회")
    @GetMapping("/detail/{id}")
    public BaseResponse detailItem(HttpServletRequest request, @PathVariable("id") Long id){

        try{
            return BaseResponse.success(itemService.detailItem(request, id));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("상품 상세 조회에 실패했습니다.");
        }
    }

    @Operation(summary = "카테고리별 아이템 조회")
    @GetMapping("/category")
    public BaseResponse getCategoryItem(@RequestParam("categoryid") Long id, @RequestParam("page") int page){
        try{
            return BaseResponse.success(itemService.getCategoryItem(id, page, 10));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카테고리별 아이템 조회에 실패했습니다.");
        }
    }

    @Operation(summary = "상품 관리 페이지")
    @GetMapping("/manage")
    public BaseResponse getManageItem(HttpServletRequest request){
        try{
            return BaseResponse.success(itemService.getManageItem(request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("상품 관리 페이지 조회에 실패했습니다.");
        }
    }


}
