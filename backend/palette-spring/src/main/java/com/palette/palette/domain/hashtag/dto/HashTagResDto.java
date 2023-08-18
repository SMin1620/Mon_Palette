package com.palette.palette.domain.hashtag.dto;

import com.palette.palette.domain.hashtag.entity.Hashtag;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HashTagResDto {

    private Long id;

    private String name;

    public static HashTagResDto toDto(Hashtag hashtag) {
        return HashTagResDto.builder()
                .id(hashtag.getId())
                .name(hashtag.getName())
                .build();
    }
}
