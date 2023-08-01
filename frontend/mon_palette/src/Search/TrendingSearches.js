import React from 'react';
import styles from './TrendingSearches.module.css';

const TrendingSearches = () => {
    const handleSearchFromTrending = (search) => {
        console.log(`검색어 "${search}"로 검색을 수행합니다.`);
      };
    const TrendingWords = ['아이섀도우', '블러셔', '립스틱', '파운데이션', '마스카라', '틴트', '아이라이너', '아이브로우', '틴트', '로션']
    return (
        <div>
            <div className={styles['trending-searches']}>
                <h3>실시간 랭킹</h3>
            </div>
            <ul className={styles.ul}>
                {TrendingWords.map((search, index) => (
                    <li key={index} onClick={ () =>handleSearchFromTrending(search) }  >
                        <span className={styles.span}>{index + 1}.</span> <div className={styles.li}>{search}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TrendingSearches;


