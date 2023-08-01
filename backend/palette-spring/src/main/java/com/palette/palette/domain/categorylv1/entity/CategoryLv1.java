package com.palette.palette.domain.categorylv1.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryLv1 {

    @Id @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String lv1name;

    @Column(nullable = false)
    private String lv1imgpath;
}
