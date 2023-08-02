package com.palette.palette.domain.categoryitemlist.entity;


import com.palette.palette.domain.category.entity.Category;
import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;

@Entity
public class CategoryProductList {

    @Id @GeneratedValue
    @Column(name = "categoryproductlist_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;
}
