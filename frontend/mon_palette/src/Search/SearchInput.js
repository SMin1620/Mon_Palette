import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { recentSearchesState } from '../Atom';
import styles from './SearchInput.module.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

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
      <ArrowCircleLeftOutlinedIcon className={styles.back} />
      <input className={styles['search-input']}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='검색어를 입력하세요'
      />
      <button className={styles['search-btn']} onClick={handleSearch}>
        <SearchOutlinedIcon className={styles.image}/>
      </button>
    </div>
  );
};

export default SearchInput;
