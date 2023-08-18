package com.palette.palette.domain.cart.entity;

import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "cart")
public class Cart {

    @Id @GeneratedValue
    @Column(name="cart_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Integer price;

    private Integer count;


}
