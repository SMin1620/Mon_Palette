package com.palette.palette.domain.address.entity;

import com.palette.palette.domain.address.dto.AddressReqDto;
import com.palette.palette.domain.address.dto.AddressResDto;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Id @GeneratedValue
    @Column(name = "address_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String receiver;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String zipcode;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private Integer isMain = 0;

    public static Address toEntity(User user, AddressReqDto addressReqDto){
        return Address.builder()
                .user(user)
                .receiver(addressReqDto.getReceiver())
                .address(addressReqDto.getAddress())
                .zipcode(addressReqDto.getZipcode())
                .phone(addressReqDto.getPhone())
                .isMain(addressReqDto.getIsMain())
                .build();
    }

    /**
     * 기본배송지 수정
     */
    public void updateIsMain(Integer isMain){
        this.isMain = isMain;
    }

    public void updateAddress(AddressReqDto addressReqDto){
        this.receiver = addressReqDto.getReceiver();
        this.address = addressReqDto.getAddress();
        this.zipcode = addressReqDto.getZipcode();
        this.phone = addressReqDto.getPhone();
        this.isMain = addressReqDto.getIsMain();
    }

}
