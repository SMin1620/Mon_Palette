package com.palette.palette.domain.cart.repository;

import com.palette.palette.domain.cart.entity.CartItem;
import com.palette.palette.domain.cart.entity.CartItemOption;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemOptionRepository extends JpaRepository<CartItemOption, Long> {

    @Query("select cio from CartItemOption cio where cio.cartItem.id = :cartItemId")
    List<CartItemOption> findAllByCartAndUser(@Param("cartItemId") Long cartItemId);

    @Query("select cio from CartItemOption cio where cio.cartItem.id = :id")
    List<CartItemOption> findByCartItemId(Long id);

//    @Query("delete from CartItemOption cio where cio.cartItem = :cartItem")
//    void deleteAllByCartItem(@Param("cartItem") CartItem cartItem);
}
