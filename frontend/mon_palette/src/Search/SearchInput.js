import React from 'react';
import searchIcon from './Search_icon.png';
import styles from './SearchInput.module.css'


const SearchInput = ({ value, onChange, onSearch }) => {
  return (
    <div>
      <div className={styles["input-container"]}>
        <input
          type="text"
          className={styles["search-input"]}
          value={value}
          onChange={onChange}
          placeholder="검색어를 입력하세요"
        />
        <button className={styles["search-btn"]} onClick={onSearch}>
          <img src={searchIcon} alt="Search Icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
