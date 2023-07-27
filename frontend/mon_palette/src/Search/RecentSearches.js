import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { recentSearchesState } from '../Atom';
import styles from './RecentSearches.module.css'; 


const RecentSearches = () => {
  const recentSearches = useRecoilValue(recentSearchesState);
  const setRecentSearches = useSetRecoilState(recentSearchesState);

  const handleRemoveRecentSearch = (index) => {
    setRecentSearches((prevSearches) => prevSearches.filter((_, i) => i !== index));
  };

  const handleSearchFromRecent = (search) => {
    console.log(`검색어 "${search}"로 검색을 수행합니다.`);
  };

  return (
    <div className={styles['recent-searches']}>
      <h3>최근 검색어</h3>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index} onClick={() => handleSearchFromRecent(search)}>
            {search}
            <button onClick={() => handleRemoveRecentSearch(index)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentSearches;
