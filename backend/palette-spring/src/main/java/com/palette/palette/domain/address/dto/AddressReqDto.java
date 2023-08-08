package com.palette.palette.domain.address.dto;

import com.palette.palette.domain.user.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressReqDto {

    @Schema(description = "사용자 아이디", example = "1")
    private Long userId;

    @Schema(description = "수령인", example = "엄마")
    private String receiver;

    @Schema(description = "주소", example = "사랑시 행복구 고백동 1004동 1004호")
    private String address;

    @Schema(description = "우편번호", example = "824915")
    private String zipcode;

    @Schema(description = "휴대폰 번호", example = "01000000000")
    private String phone;

    @Schema(description = "기본배송지 여부", example = "1")
    private Integer isMain;
}
