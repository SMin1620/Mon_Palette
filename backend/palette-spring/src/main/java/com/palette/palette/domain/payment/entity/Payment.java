package com.palette.palette.domain.payment.entity;

import com.palette.palette.domain.order.entity.Order;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
@Getter
@NoArgsConstructor
@Setter
@Table(name = "payments", indexes = @Index(name = "index_payments_order_id", columnList = "order_id"))
@ToString
public class Payment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    @JoinColumn(name = "buyer_id")
    @ManyToOne
    private User buyer; // 구매자

    @Column(unique = true)
    private String paymentId; // PG 사에서 생성한 주문 번호

    @Column(unique = true)
    private String txId; // PG 사에서 생성한 트랜잭션 번호

//    @Column(nullable = false, unique = true)
//    private String orderId; // 우리가 생성한 주문 번호
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private PaymentMethod paymentMethod; // 결제 수단

    private String name; // 결제 이름

    @Column(nullable = false)
    private Integer price; // 결제 금액

    @Builder.Default
    @Column(nullable = false)
    private PaymentStatus status = PaymentStatus.READY; // 상태

    @CreatedDate
    private LocalDateTime createAt; // 결제 요청 일시

    private LocalDateTime paidAt; // 결제 완료 일시

    private LocalDateTime failedAt; // 결제 실패 일시

    @Builder.Default
    private BigDecimal cancelledAmount = BigDecimal.ZERO; // 취소된 금액

    private LocalDateTime cancelAt; // 결제 취소 일시
}
