package com.palette.palette.domain.makeup.entity;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "makeup_images")
public class MakeUpImage {

    @Id
    @GeneratedValue
    @Column(name = "makeup_image_id")
    private Long id;

    private String imageName;

    private String imagePath;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "makeup_id")
    private MakeUp makeUp;

}
