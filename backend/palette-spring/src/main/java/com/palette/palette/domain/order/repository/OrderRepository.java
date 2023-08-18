package com.palette.palette.domain.order.repository;

import com.palette.palette.domain.order.dto.list.OrderListResDto;
import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByUser(User user);

}
