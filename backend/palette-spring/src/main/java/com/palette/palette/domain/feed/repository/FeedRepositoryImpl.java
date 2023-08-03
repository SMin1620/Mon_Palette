package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedCustomRepository;
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

import static com.palette.palette.domain.feed.entity.QFeed.feed;


public class FeedRepositoryImpl extends QuerydslRepositorySupport implements FeedCustomRepository {


    @Autowired
    private JPAQueryFactory jpaQueryFactory;

    public FeedRepositoryImpl() {
        super(Feed.class);
    }


    @Override
    public Page<Feed> findBySearchOption(Pageable pageable, String content, String orderBy, String color) {


        JPAQuery<Feed> query = jpaQueryFactory.selectFrom(feed)
                .where(containContent(content), eqColor(color));


        // 정렬 기준
        if (orderBy == null || orderBy.isEmpty()) query.orderBy(feed.createAt.desc());
        else if (orderBy.equals("popular")) query.orderBy(feed.likeCount.desc());
        else query.orderBy(feed.createAt.desc());

        List<Feed> feeds = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Feed>(feeds, pageable, query.fetchCount());
    }

    /**
     * 메인 피드 목록 조회
     */
    @Override
    public Page<Feed> findByMainFeed(Pageable pageable, User user) {
        JPAQuery<Feed> query = jpaQueryFactory.selectFrom(feed)
                .where(eqColor(user.getPersonalColor()))
                .orderBy(feed.createAt.desc());


        List<Feed> feeds = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Feed>(feeds, pageable, query.fetchCount());
    }


    @Override
    public Page<Feed> findByFeedList(Pageable pageable, String orderBy, String color) {


        JPAQuery<Feed> query = jpaQueryFactory.selectFrom(feed)
                .where(eqColor(color));


        // 정렬 기준
        if (orderBy == null || orderBy.isEmpty()) query.orderBy(feed.createAt.desc());
        else if (orderBy.equals("popular")) query.orderBy(feed.likeCount.desc());
        else query.orderBy(feed.createAt.desc());

        List<Feed> feeds = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Feed>(feeds, pageable, query.fetchCount());
    }

    // 검색어 포함 메서드
    private BooleanExpression containContent(String content) {
        if (content == null || content.isEmpty()) {
            return null;
        }

        return feed.content.containsIgnoreCase(content);
    }

    // 컬러 타입 일치 확인 메서드
    private BooleanExpression eqColor(String color) {
        if (color == null || color.isEmpty()) {
            return null;
        }

        return feed.user.personalColor.eq(color);
    }

}
