package com.palette.palette.domain.itemDetailPhoto.entity;

import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;

public class ItemDetailPhoto {

    @Id @GeneratedValue
    @Column(name = "item_detail_photo_id")
    private Long id;

    @Column(nullable = false)
    private String itemDetailImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

}
