package com.palette.palette.domain.user.repository;

import com.palette.palette.domain.challenge.entity.Challenge;
import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.user.entity.User;
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
import static com.palette.palette.domain.user.entity.QUser.user;


public class UserRepositoryImpl extends QuerydslRepositorySupport implements UserCustomRepository {


    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    public UserRepositoryImpl() {
        super(Feed.class);
    }


    @Override
    public Page<User> findBySearchOption(Pageable pageable, String content, String orderBy, String color) {


        JPAQuery<User> query = jpaQueryFactory.selectFrom(user)
                .where(containContent(content), eqColor(color));


        // 정렬 기준
        if (orderBy == null || orderBy.isEmpty()) query.orderBy(user.createAt.desc());
        else if (orderBy.equals("popular")) query.orderBy(user.nickname.desc());
        else query.orderBy(user.createAt.desc());

        List<User> users = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<User>(users, pageable, query.fetchCount());
    }

    // 검색어 포함 메서드
    private BooleanExpression containContent(String content) {
        if (content == null || content.isEmpty()) {
            return null;
        }

        return user.nickname.containsIgnoreCase(content);
    }

    // 컬러 타입 일치 확인 메서드
    private BooleanExpression eqColor(String color) {
        if (color == null || color.isEmpty()) {
            return null;
        }

        return user.personalColor.eq(color);
    }

}
