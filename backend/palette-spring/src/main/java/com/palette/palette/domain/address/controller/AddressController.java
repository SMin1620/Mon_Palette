package com.palette.palette.domain.address.controller;

import com.palette.palette.common.BaseResponse;
import com.palette.palette.domain.address.dto.AddressReqDto;
import com.palette.palette.domain.address.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/address")
@Slf4j
@Tag(name ="주소 API")
public class AddressController {

    private final AddressService addressService;

    @Operation(summary = "배송지 추가")
    @PostMapping()
    public BaseResponse insertAddress(HttpServletRequest request, @RequestBody @Valid AddressReqDto addressReqDto){
        try{
            return BaseResponse.success(addressService.addAddress(request, addressReqDto));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("배송지 추가에 실패했습니다.");
        }

    }

    @Operation(summary = "내 배송지 목록")
    @GetMapping()
    public BaseResponse getAddress(HttpServletRequest request){
        try{
            return BaseResponse.success(addressService.getAddress(request));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("배송지 목록을 조회하는데 실패하였습니다.");
        }
    }

    @Operation(summary = "내 배송지 수정")
    @PutMapping("/{id}")
    public BaseResponse updateAddress(
            HttpServletRequest request,
            @RequestBody @Valid AddressReqDto addressReqDto,
            @PathVariable("id") Long addressId
    ){
        try{
            return BaseResponse.success(addressService.updateAddress(request, addressReqDto, addressId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("배송지 수정하는데 실패하였습니다.");
        }
    }

    @Operation(summary = "배송지 삭제")
    @DeleteMapping("/{id}")
    public BaseResponse deleteAddress(@PathVariable("id") Long addressId){
        try{
            return BaseResponse.success(addressService.deleteAddress(addressId));
        }catch (Exception e){
            e.printStackTrace();
            return BaseResponse.error("배송지 삭제하는데 실패하였습니다.");
        }
    }



}
