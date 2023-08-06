// TrendingSearches.js
import React, { useState, useEffect } from 'react';
import styles from './TrendingSearches.module.css';
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from '../user/components/Atom/loginState';
import { resultsState, searchQueryState } from './Atom';
import { Link } from 'react-router-dom';

const TrendingSearches = () => {
  const [TrendingWords, setTrendingWords] = useState([]);
  const Authorization = useRecoilValue(loginState);
  const [results, setResults] = useRecoilState(resultsState);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  
  const handleSearchFromTrending = (search) => {
    // console.log(`검색어 "${search}"로 검색을 수행합니다.`);
    setSearchQuery(search);
  };

  const getlist = () => {
    axios.get(`${process.env.REACT_APP_API}/api/search/ranking`, {
      headers: { Authorization: Authorization }
    })
    .then((response) => {
      if (response.data !== null) {
        setTrendingWords(response.data.data) // 필요 시 수정
        console.log(response.data.data)
      }
    })
    return 
  };

  useEffect(() => {
    getlist();
  }, []);
  
  return (
    <div>
      <div className={styles['trending-searches']}>
        <h3>실시간 랭킹</h3>
      </div>
      <ul className={styles.ul}>
        {TrendingWords.map((item, index) => (
          <li key={index} onClick={() => handleSearchFromTrending(item.keyword)}>
            <Link to={`/result?query=${item.keyword}`} style={{textDecoration: "none"}}>
              <span className={styles.span}>{index + 1}.</span>
              <div className={styles.li}>{item.keyword}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default TrendingSearches;
