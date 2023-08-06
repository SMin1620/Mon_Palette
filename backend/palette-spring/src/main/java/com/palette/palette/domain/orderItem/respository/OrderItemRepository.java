package com.palette.palette.domain.orderItem.respository;

import com.palette.palette.domain.orderItem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
