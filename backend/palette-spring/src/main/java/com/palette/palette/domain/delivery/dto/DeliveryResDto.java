package com.palette.palette.domain.delivery.dto;

import com.palette.palette.domain.delivery.entity.Delivery;
import com.palette.palette.domain.delivery.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryResDto {

    private Long id;

    private String address;

    private String zipcode;

    private String receiver;

    private String phone;

    private DeliveryStatus deliveryStatus;

    public static DeliveryResDto toDto(Delivery delivery) {
        return DeliveryResDto.builder()
                .id(delivery.getId())
                .address(delivery.getAddress())
                .zipcode(delivery.getZipcode())
                .receiver(delivery.getReceiver())
                .phone(delivery.getPhone())
                .deliveryStatus(delivery.getDeliveryStatus())
                .build();
    }
}
