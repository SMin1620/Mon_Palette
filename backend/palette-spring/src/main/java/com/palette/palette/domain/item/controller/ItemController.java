package com.palette.palette.domain.item.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.item.dto.ItemAddReqDto;
import com.palette.palette.domain.item.repository.ItemRepository;
import com.palette.palette.domain.item.service.ItemService;
import com.palette.palette.domain.user.repository.UserRepository;
import com.palette.palette.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/item")
@Tag(name = "아이템 API")
public class ItemController {

    private final ItemService itemService;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

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

    @Operation(summary = "상품 수정")
    @PutMapping("/{id}")
    public BaseResponse updateItem(HttpServletRequest requst, @PathVariable("id") Long id){
        try{
            return BaseResponse.success(true);
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("상품 수정이 실패하였습니다.");
        }

    }


}
