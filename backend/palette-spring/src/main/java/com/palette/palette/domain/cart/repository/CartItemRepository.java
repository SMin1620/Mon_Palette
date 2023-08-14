package com.palette.palette.domain.cart.repository;

import com.palette.palette.domain.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select  ci from CartItem ci where ci.cart.id = :cartId")
    List<CartItem> findByCartId(Long cartId);
}
