package com.palette.palette.domain.item.entity;


import com.palette.palette.domain.item.dto.ItemAddReqDto;
import com.palette.palette.domain.itemPhoto.entity.ItemPhoto;
import com.palette.palette.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLDelete(sql = "UPDATE items SET is_delete = true, delete_at = CURRENT_TIMESTAMP WHERE item_id = ?")  // delete 쿼리가 발생하면 해당 쿼리가 대신 실행.
@Where(clause = "is_delete = false") // select 쿼리가 발생할 때, 디폴트 값으로 추가되어서 쿼리가 실행.
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer price = 0;

    private Integer discount = 0;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String manufact;

    private Integer deliveryFee;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private Integer maximum = 0;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    @Builder.Default
    private Boolean isDelete = Boolean.FALSE;

    private LocalDateTime deleteAt;

    private LocalDateTime endAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public static Item toEntity(ItemAddReqDto req, User user){
        return Item.builder()
                .name(req.getItemaName())
                .price(req.getPrice())
                .discount(req.getDiscount())
                .content(req.getContent())
                .manufact(req.getManufact())
                .deliveryFee(req.getDeliveryFee())
                .thumbnail(req.getThumbnail())
                .maximum(req.getMaximum())
                .createAt(req.getCreateAt())
                .endAt(req.getEndAt())
                .user(user)
                .build();
    }

}
