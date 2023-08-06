package com.palette.palette.domain.categoryitemlist.entity;


import com.palette.palette.domain.category.entity.Category;
import com.palette.palette.domain.item.entity.Item;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryProductList {

    @Id @GeneratedValue
    @Column(name = "categoryproductlist_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "item_id")
    private Item item;

    public static CategoryProductList toEntity(Category category, Item item){
        return CategoryProductList.builder()
                .category(category)
                .item(item)
                .build();
    }
}
