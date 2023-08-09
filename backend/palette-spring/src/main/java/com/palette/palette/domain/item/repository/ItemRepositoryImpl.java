package com.palette.palette.domain.item.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.challenge.repository.ChallengeCustomRepository;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.item.entity.Item;
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
import static com.palette.palette.domain.item.entity.QItem.item;


public class ItemRepositoryImpl extends QuerydslRepositorySupport implements ItemCustomRepository {


    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    public ItemRepositoryImpl() {
        super(Feed.class);
    }


    @Override
    public Page<Item> findBySearchOption(Pageable pageable, String content, String orderBy, String color) {


        JPAQuery<Item> query = jpaQueryFactory.selectFrom(item)
                .where(containContent(content), eqColor(color));


        // 정렬 기준
        if (orderBy == null || orderBy.isEmpty()) query.orderBy(item.createAt.desc());
//        else if (orderBy.equals("popular")) query.orderBy(item.likeCount.desc());
        else query.orderBy(item.createAt.desc());

        List<Item> items = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Item>(items, pageable, query.fetchCount());
    }

    // 검색어 포함 메서드
    private BooleanExpression containContent(String content) {
        if (content == null || content.isEmpty()) {
            return null;
        }

        return item.name.containsIgnoreCase(content);
    }

    // 컬러 타입 일치 확인 메서드
    private BooleanExpression eqColor(String color) {
        if (color == null || color.isEmpty()) {
            return null;
        }

        return item.user.personalColor.eq(color);
    }

}
