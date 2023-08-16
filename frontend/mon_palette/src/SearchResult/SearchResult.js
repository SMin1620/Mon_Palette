import React, { useState } from 'react';
import styles from './SearchResult.module.css';
import SearchResultShop from './SearchResultShop';
import SearchResultFeed from './SearchResultFeed';
import SearchResultChallenge from './SearchResultChallenge';
import SearchResultUser from './SearchResultUser';
import SearchInput from '../Search/SearchInput';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
    const [resultType, setResultType] = useState('feed');
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('query');

    let ResultComponent;
    switch (resultType) {
        case 'item':
            ResultComponent = SearchResultShop;
            break;
        case 'feed':
            ResultComponent = SearchResultFeed;
            break;
        case 'challenge':
            ResultComponent = SearchResultChallenge;
            break;
        case 'user':
            ResultComponent = SearchResultUser;
            break;
        default:
            ResultComponent = SearchResultFeed;
            break;
    }

    return (
        <div>
            <div className={styles['search-container']}>
                <SearchInput />
            </div>
            <div className={styles["search_result"]}>
                <div className={styles["search_result_top"]}>
                    <div className={`${styles["search_result_page"]} ${resultType === "feed" ? styles.active : ''}`} onClick={() => setResultType("feed")}>Feed</div>
                    <div className={`${styles["search_result_page"]} ${resultType === "item" ? styles.active : ''}`} onClick={() => setResultType("item")}>한정 판매</div>
                    <div className={`${styles["search_result_page"]} ${resultType === "challenge" ? styles.active : ''}`} onClick={() => setResultType("challenge")}>Challenge</div>
                    <div className={`${styles["search_result_page"]} ${resultType === "user" ? styles.active : ''}`} onClick={() => setResultType("user")}>User</div>
                </div>
                <ResultComponent query={searchQuery} />
            </div>
        </div>
    );
}

export default SearchResult;
