package com.palette.palette.domain.itemDetailPhoto.entity;

import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemDetailPhoto {

    @Id @GeneratedValue
    @Column(name = "item_detail_photo_id")
    private Long id;

    @Column(nullable = false)
    private String itemDetailImage;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    public static ItemDetailPhoto toEntity(String itemDetailImage, Item item){
        return ItemDetailPhoto.builder()
                .itemDetailImage(itemDetailImage)
                .item(item)
                .build();
    }

}
