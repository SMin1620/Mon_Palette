package com.palette.palette.domain.payment.repository;

import com.palette.palette.domain.payment.entity.Payment;
import com.palette.palette.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

//    List<Payment> findAllByBuyer(User buyer);

    Optional<Payment> findByOrderIdAndBuyer(Long orderId, User buyer);
}
