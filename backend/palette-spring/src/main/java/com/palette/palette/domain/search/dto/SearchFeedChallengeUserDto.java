package com.palette.palette.domain.search.dto;


import com.palette.palette.domain.challenge.dto.list.ChallengeResDto;
import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.dto.BaseUserResDto;
import com.palette.palette.domain.feed.dto.list.FeedResDto;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchFeedChallengeUserDto {

    private List<BaseUserResDto> user;

    private List<FeedResDto> feed;

    private List<ChallengeResDto> challenge;

}
