package com.palette.palette.domain.challenge.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static com.palette.palette.domain.challenge.entity.QChallenge.challenge;


public class ChallengeRepositoryImpl extends QuerydslRepositorySupport implements ChallengeCustomRepository {


    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    public ChallengeRepositoryImpl() {
        super(Feed.class);
    }


    @Override
    public Page<Challenge> findBySearchOption(Pageable pageable, String content, String orderBy, String color) {


        JPAQuery<Challenge> query = jpaQueryFactory.selectFrom(challenge)
                .where(containContent(content), eqColor(color));


        // 정렬 기준
        if (orderBy == null || orderBy.isEmpty()) query.orderBy(challenge.createAt.desc());
        else if (orderBy.equals("popular")) query.orderBy(challenge.likeCount.desc());
        else query.orderBy(challenge.createAt.desc());

        List<Challenge> challenges = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Challenge>(challenges, pageable, query.fetchCount());
    }

    // 검색어 포함 메서드
    private BooleanExpression containContent(String content) {
        if (content == null || content.isEmpty()) {
            return null;
        }

        return challenge.content.containsIgnoreCase(content);
    }

    // 컬러 타입 일치 확인 메서드
    private BooleanExpression eqColor(String color) {
        if (color == null || color.isEmpty()) {
            return null;
        }

        return challenge.user.personalColor.eq(color);
    }

}
