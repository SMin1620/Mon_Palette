package com.palette.palette.domain.categoryitemlist.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class CategoryProductList {

    @Id @GeneratedValue
    private Long id;
}
