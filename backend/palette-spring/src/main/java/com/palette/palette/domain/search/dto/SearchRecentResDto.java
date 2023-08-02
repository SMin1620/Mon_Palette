package com.palette.palette.domain.search.dto;


import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("userId")
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SearchRecentResDto {

    @Id
    private Long userId;

    private String keyword;

    public static SearchRecentResDto toDto(String keyword) {
        return SearchRecentResDto.builder()
                .keyword(keyword)
                .build();
    }
}
