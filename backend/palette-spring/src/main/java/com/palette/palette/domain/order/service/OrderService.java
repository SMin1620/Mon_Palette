package com.palette.palette.domain.order.service;


import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.order.dto.create.OrderReqDto;
import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.order.entity.OrderItem;
import com.palette.palette.domain.order.repository.OrderRepository;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;



    /**
     * 주문 하기
     */
    public void create(OrderReqDto orderReqDto, User user) {

        Order order = Order.toEntity(orderReqDto, user);
        orderRepository.save(order);


    }

}
