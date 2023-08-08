package com.palette.palette.domain.order.dto.create;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddressDto {

    private String address;

    private String phone;

    private String zipcode;
}
