package com.palette.palette.domain.orderItem.respository;

import com.palette.palette.domain.orderItem.entity.OrderItem;
import com.palette.palette.domain.orderItem.entity.OrderItemOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemOptionRepository extends JpaRepository<OrderItemOption, Long> {

    @Query("select oio from OrderItemOption oio where oio.orderItem.id = :orderId")
    List<OrderItemOption> findAllByOrderAndUser(Long orderId);

    @Query("select oio from OrderItemOption oio where oio.orderItem.id = :id")
    List<OrderItemOption> findByOrderItemId(Long id);
}
