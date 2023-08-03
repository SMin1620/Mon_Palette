package com.palette.palette.domain.order.entity;


import com.palette.palette.domain.item.entity.Item;
import com.palette.palette.domain.itemOption.entity.ItemOption;
import com.palette.palette.domain.order.dto.create.OrderItemReqDto;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    private Integer price;

    private Integer count;


    /**
     * dto -> entity
     */
    public static OrderItem toEntity(OrderItemReqDto orderItemReqDto, Order order, Item item) {

        return OrderItem.builder()
                .item(item)
                .order(order)
                .count(orderItemReqDto.getCount())
                .build();
    }

}
