package com.palette.palette.domain.cart.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.cart.dto.CartAddReqDto;
import com.palette.palette.domain.cart.dto.CartUpdateReqDto;
import com.palette.palette.domain.cart.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "cart API")
public class CartController {

    private final CartService cartService;

    @Operation(summary = "카트에 담기")
    @PostMapping("/insert")
    public BaseResponse insertCart(HttpServletRequest request, @RequestBody @Valid CartAddReqDto cartAddReqDto){
        System.out.println("cartAddReqDto : " + cartAddReqDto);
        try{
            return BaseResponse.success(cartService.insertCart(cartAddReqDto, request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카트에 담기 실패하였습니다.");
        }
    }

    @Operation(summary = "카트 아이템 업데이트")
    @PutMapping("/{itemId}")
    public BaseResponse updateCartItem(HttpServletRequest request, @PathVariable("itemId") Long itemId, @RequestBody @Valid CartUpdateReqDto cartUpdateReqDto){
        try{
            return BaseResponse.success(cartService.updateCartItem(request, itemId, cartUpdateReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카트 아이템 수정에 실패했습니다.");
        }
    }

    @Operation(summary = "카트 목록 조회")
    @GetMapping()
    public BaseResponse getList(HttpServletRequest request){
        try {
            return BaseResponse.success(cartService.list(request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카트 목록 조회에 실패했습니다.");
        }
    }

    @Operation(summary = "카트 삭제")
    @DeleteMapping("/{cartItemId}")
    public BaseResponse deleteCart(HttpServletRequest request, @PathVariable("cartItemId") Long cartItemId){
        try{
            return BaseResponse.success(cartService.deleteCart(request, cartItemId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("카트 삭제에 실패하였습니다.");
        }
    }

}
