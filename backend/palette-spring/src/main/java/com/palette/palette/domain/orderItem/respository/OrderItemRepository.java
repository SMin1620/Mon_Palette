package com.palette.palette.domain.orderItem.respository;

import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.orderItem.entity.OrderItem;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

   @Query("select oi from OrderItem oi where oi.order.id = :orderId and oi.order.user.id = :userId")
   List<OrderItem> findAllByOrderAndUser(Long orderId, Long userId);
}
