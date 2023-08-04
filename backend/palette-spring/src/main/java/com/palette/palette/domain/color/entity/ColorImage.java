package com.palette.palette.domain.color.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "color_images")
public class ColorImage {

    @Id
    @GeneratedValue
    @Column(name = "color_image_id")
    private Long id;

    private String imageName;

    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;

}
