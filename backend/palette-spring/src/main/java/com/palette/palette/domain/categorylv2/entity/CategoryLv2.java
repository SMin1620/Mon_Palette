package com.palette.palette.domain.categorylv2.entity;

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
public class CategoryLv2 {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String lv2name;

    @Column(nullable = false)
    private String lv2imgpath;
}
