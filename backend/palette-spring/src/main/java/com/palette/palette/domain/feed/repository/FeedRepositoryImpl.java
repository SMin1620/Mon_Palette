package com.palette.palette.domain.feed.repository;

import com.palette.palette.domain.feed.entity.Feed;
import com.palette.palette.domain.feed.repository.FeedCustomRepository;
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
    public Page<Feed> findBySearchOption(Pageable pageable, String content) {

        JPAQuery<Feed> query = jpaQueryFactory.selectFrom(feed)
                .where(containContent(content))
                .orderBy(feed.createAt.desc());

        List<Feed> feeds = this.getQuerydsl().applyPagination(pageable, query).fetch();
        return new PageImpl<Feed>(feeds, pageable, query.fetchCount());
    }

    private BooleanExpression containContent(String content) {
        if (content == null || content.isEmpty()) {
            return null;
        }

        return feed.content.containsIgnoreCase(content);
    }
}
