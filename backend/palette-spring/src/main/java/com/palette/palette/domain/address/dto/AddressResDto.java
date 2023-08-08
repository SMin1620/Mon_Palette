package com.palette.palette.domain.address.dto;

import com.palette.palette.domain.address.entity.Address;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddressResDto {

    private Long id;

    private String receiver;

    private String address;

    private String zipcode;

    private String phone;

    private Integer isMain;

    public static AddressResDto toDto(Address address){
        return AddressResDto.builder()
                .id(address.getId())
                .receiver(address.getReceiver())
                .address(address.getAddress())
                .zipcode(address.getZipcode())
                .phone(address.getPhone())
                .isMain(address.getIsMain())
                .build();
    }

}
