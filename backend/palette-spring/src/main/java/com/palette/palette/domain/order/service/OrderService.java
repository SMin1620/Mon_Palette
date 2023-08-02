package com.palette.palette.domain.order.service;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {


    /**
     * 주문 생성
     */
    @Transactional
    public void orderCreate(OrderCreateReqDto orderCreateReqDto) {

    }

}
