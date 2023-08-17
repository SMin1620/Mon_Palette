package com.palette.palette.domain.cart.entity;

import com.palette.palette.domain.itemOption.entity.ItemOption;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_item_options")
public class CartItemOption {

    @Id
    @GeneratedValue
    @Column(name = "cart_item_option_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_option_id")
    private ItemOption itemOption;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_item_id")
    private CartItem cartItem;

    private Integer cartPrice;

    private Integer cartCount;
}
