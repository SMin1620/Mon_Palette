package com.palette.palette.domain.cart.repository;

import com.palette.palette.domain.cart.entity.CartItem;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    @Query("select  ci from CartItem ci where ci.cart.id = :cartId")
    List<CartItem> findByCartId(Long cartId);

    @Query("select ci from CartItem ci where ci.cart.id = :cartId and ci.item.isDelete = false")
    List<CartItem> findByCartIdItem(Long cartId);

//    @Query("delete from CartItem ci where ci.id = :cartItemId")
//    void deleteByCartId(@Param("cartItemId") Long cartItemId);
}
