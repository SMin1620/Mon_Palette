package com.palette.palette.domain.order.entity;


import com.palette.palette.domain.delivery.entity.Delivery;
import com.palette.palette.domain.delivery.entity.DeliveryStatus;
import com.palette.palette.domain.orderItem.entity.OrderItem;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private Integer price;

    private Integer count;

    private String requirement;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    private LocalDateTime orderAt;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;


    public void cancel(List<OrderItem> orderItem) {
        if (delivery.getDeliveryStatus() == DeliveryStatus.COMP) {
            throw new IllegalArgumentException("이미 배송이 완료된 상품은 취소할 수 없습니다.");
        }

        this.orderStatus = OrderStatus.CANCEL;

        for (OrderItem item : orderItem) {
            item.cancel();
        }

    }

}
