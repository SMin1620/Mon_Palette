package com.palette.palette.domain.feed.dto.list;

import com.palette.palette.domain.search.dto.SearchRankResDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedBaseDto {

    private List<SearchRankResDto> tagRanking;

    private List<FeedResDto> feeds;


}
