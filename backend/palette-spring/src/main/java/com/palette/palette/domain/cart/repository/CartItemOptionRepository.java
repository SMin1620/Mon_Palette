package com.palette.palette.domain.cart.repository;

import com.palette.palette.domain.cart.entity.CartItemOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemOptionRepository extends JpaRepository<CartItemOption, Long> {

    @Query("select cio from CartItemOption cio where cio.cartItem.id = :cartId")
    List<CartItemOption> findAllByCartAndUser(Long cartId);

    @Query("select cio from CartItemOption cio where cio.cartItem.id = :id")
    List<CartItemOption> findByCartItemId(Long id);
}
