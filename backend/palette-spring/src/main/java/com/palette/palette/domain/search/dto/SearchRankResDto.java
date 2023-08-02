package com.palette.palette.domain.search.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.ZSetOperations;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchRankResDto {

    private String keyword;

    private Integer score;

}
