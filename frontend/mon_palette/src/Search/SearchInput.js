// SearchInput.js
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { recentSearchesState } from '../Atom';
import styles from './SearchInput.module.css'

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);

  const handleSearch = () => {
    if (searchQuery !== '') {
      setRecentSearches((prevSearches) => [...prevSearches, searchQuery]);
      setSearchQuery('');
    }
  };

  return (
    <div className={styles['input-container']}>
      <input className={styles['search-input']}
        type="text"
        placeholder='ddddd'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className={styles['search-btn']} onClick={handleSearch}>
        <img src="./Search_icon.png" alt="aaaa" />
      </button>
    </div>
  );
};

export default SearchInput;
