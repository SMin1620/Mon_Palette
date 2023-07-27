import React from 'react';
import RecentSearches from './RecentSearches';
import SearchInput from './SearchInput';
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
