package com.palette.palette.domain.itemPhoto.entity;

import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ItemPhoto {

    @Id @GeneratedValue
    @Column(name = "item_photo_id")
    private Long id;

    @Column(nullable = false)
    private String itemImage;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    public static ItemPhoto toEntity(String itemImage, Item item){
        return ItemPhoto.builder()
                .itemImage(itemImage)
                .item(item)
                .build();
    }

}
