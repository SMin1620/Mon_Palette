package com.palette.palette.domain.order.service;


import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.order.dto.create.OrderCreateReqDto;
import com.palette.palette.domain.order.dto.create.OrderItemDto;
import com.palette.palette.domain.order.dto.create.OrderItemOptionDto;
import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.order.entity.OrderItem;
import com.palette.palette.domain.order.entity.OrderStatus;
import com.palette.palette.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

//    private final ItemRepository itemRepository;
//
//
//    /**
//     * 주문 생성
//     */
//    @Transactional
//    public void orderCreate(OrderCreateReqDto orderCreateReqDto, User user) {
//
//        /////// 주문
//        // Order 생성
//        Order order = Order.builder()
//                .requirement(orderCreateReqDto.getRequirement())
//                .orderStatus(OrderStatus.ORDER)
//                .orderAt(LocalDateTime.now())
//                .build();
//
//        // 주문 총 가격, 개수
//        Integer totalPrice = 0;
//        Integer totalCount = 0;
//
//        // 각 OrderItem 생성
//        for (OrderItemDto orderItemDto : orderCreateReqDto.getItems()) {
//
//            // DB의 Item 가져오기
//            Item item = itemRepository.findById(orderItemDto.getItemId())
//                            .orElseThrow(() -> new IllegalArgumentException("아이템을 찾지 못했습니다. Item ID: " + orderItemDto.getItemId()));
//
//
//            for (OrderItemOptionDto orderItemOptionDto : orderItemDto.getItemOptions()) {
//
//                // DB에 ItemOption 가져오기
//                ItemOption itemOption = itemOptionRepository.findById(orderItemOptionDto.getItemOptionId())
//                        .orElseThrow(() -> new IllegalArgumentException("아이템을 찾지 못했습니다. Item ID: " + orderItemOptionDto.getItemOptionId()));
//
//                // 주문 총 가격 합, 개수 계산
//                totalPrice += orderItemOptionDto.getItemOptionPrice() * orderItemOptionDto.getItemOptionCount();
//                totalCount += orderItemOptionDto.getItemOptionCount();
//
//                OrderItem orderItem = OrderItem.builder()
//                        .item(item)
//                        .itemOption(itemOption)
//                        .order(order)
//                        .orderCount(orderItemOptionDto.getItemOptionCount())
//                        .orderPrice(orderItemOptionDto.getItemOptionPrice() * orderItemOptionDto.getItemOptionCount())
//                        .build();
//
//                orderItemRepository.save(orderItem);
//            }
//        }
//
//        order.setPrice(totalPrice);
//        order.setCount(totalCount);
//        orderRepository.save(order);
//
//
//        ////// 배송
//
//    }

}
