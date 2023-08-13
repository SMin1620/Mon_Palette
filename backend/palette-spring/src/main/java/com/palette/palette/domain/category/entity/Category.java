package com.palette.palette.domain.category.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Category {

    @Id @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    @Column(nullable = false)
    private String name;

    private String categoryPhoto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;

    public Category(String name, String categoryPhoto,Category parent){
        this.name = name;
        this.categoryPhoto = categoryPhoto;
        this.parent = parent;
    }

    public static Category toEntity(String name, String categoryPhoto,Category parent){
        return Category.builder()
                .name(name)
                .categoryPhoto(categoryPhoto)
                .parent(parent)
                .build();
    }
}
