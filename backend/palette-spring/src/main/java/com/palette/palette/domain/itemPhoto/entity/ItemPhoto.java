package com.palette.palette.domain.itemPhoto.entity;

import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
}
