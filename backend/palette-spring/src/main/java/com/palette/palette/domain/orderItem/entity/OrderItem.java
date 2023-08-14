package com.palette.palette.domain.orderItem.entity;


import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.order.entity.Order;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue
    @Column(name = "order_item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "item_option_id")
//    private ItemOption itemOption;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private Integer orderPrice;

    private Integer orderCount;


//    /**
//     * 주문 취소 시 재고량 증가
//     */
//    public void cancel() {
//        getItemOption().addStock(orderCount);
//    }
//
//    /**
//     * 주문 상품 옵션 가격
//     */
//    public int getTotalPrice() {
//        return getOrderPrice() * getOrderCount();
//    }

}
