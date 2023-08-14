package com.palette.palette.domain.cart.repository;


import com.palette.palette.domain.cart.entity.Cart;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findAllByUser(User user);
}
