import React, { useState } from 'react';
import './Search2.css';
import SearchInput from './SearchInput';
import RecentSearches from './RecentSearches';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const Search2 = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const { searchInfo } = useParams()


  const handleSearch = () => {
    // API 통신을 수행하여 검색 결과를 가져오는 로직을 추가
    // 백엔드와 통신하여 검색 결과를 가져와서 처리하는 코드를 작성
    if (searchQuery !== '') {
        setRecentSearches((prevSearches) => [...prevSearches, searchQuery]);
        navigate('/searchResult/:searchInfo')
        console.log(searchInfo)
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
    <div className="search-container">
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
