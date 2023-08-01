// Search2.js
import React from 'react';
import SearchInput from './SearchInput';
import RecentSearches from './RecentSearches';
import styles from './Search2.module.css'
import TrendingSearches from './TrendingSearches';

const Search2 = () => {
  return (
    <div className={styles.container}>
    <div className={styles['search-container']}>
      <SearchInput />
    </div>
      <hr className={styles['line']} />
      <RecentSearches />
      <TrendingSearches />
    </div>
  );
};

export default Search2;
