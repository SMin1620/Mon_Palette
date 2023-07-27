import React, { useState } from 'react';
import { useRecoilState } from 'recoil'; 
import { recentSearchesState } from '../Atom'; 
import RecentSearches from './RecentSearches';
import SearchInput from './SearchInput';
import styles from './Search2.module.css'

const Search2 = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);

  const handleSearch = () => {
    // API 통신을 수행하여 검색 결과를 가져오는 로직을 추가
    // 백엔드와 통신하여 검색 결과를 가져와서 처리하는 코드를 작성
    if (searchQuery !== '') {
      setRecentSearches((prevSearches) => [...prevSearches, searchQuery]);
      setSearchQuery('');
    }
  };

  const handleRemoveRecentSearch = (index) => {
    // 최근 검색어 삭제
    setRecentSearches((prevSearches) => prevSearches.filter((_, i) => i !== index));
  };

  const handleSearchFromRecent = (search) => {
    // 검색어 클릭해서 검색하기
    console.log(`검색어 "${search}"로 검색을 수행합니다.`);
    // API 통신을 수행하여 검색 결과를 가져오는 로직을 추가
    // 백엔드와 통신하여 검색 결과를 가져와서 처리하는 코드를 작성
  };

  return (
    <div className={styles['search-container']}>
      <SearchInput
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearch={handleSearch}
      />
      <RecentSearches
        searches={recentSearches}
        onRemove={handleRemoveRecentSearch}
        onSearchFromRecent={handleSearchFromRecent}
      />
    </div>
  );
};

export default Search2;
