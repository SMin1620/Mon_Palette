// Search2.js
import React from 'react';
import SearchInput from './SearchInput';
import RecentSearches from './RecentSearches';
import styles from './Search2.module.css'

const Search2 = () => {
  return (
    <div className={styles['search-container']}>
      <SearchInput />
      <RecentSearches
      />
    </div>
  );
};

export default Search2;
