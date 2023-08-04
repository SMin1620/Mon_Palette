package com.palette.palette.domain.color.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "colors")
public class Color {

    @Id
    @GeneratedValue
    @Column(name = "color_id")
    private Long id;

    private String name;

}
