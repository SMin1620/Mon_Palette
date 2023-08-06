package com.palette.palette.domain.address.entity;

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

}
