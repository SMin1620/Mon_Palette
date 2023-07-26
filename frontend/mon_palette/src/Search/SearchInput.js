import React from 'react';
import searchIcon from './Search_icon.png';
import './SearchInput.css'

const SearchInput = ({ value, onChange, onSearch }) => {
  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
        />
        <button className="search-btn" onClick={onSearch}>
          <img src={searchIcon} alt="Search Icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
