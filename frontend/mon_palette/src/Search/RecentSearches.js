import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// import { recentSearchesState } from './Atom';
import styles from './RecentSearches.module.css'; 
import axios from "axios";
import { loginState } from '../user/components/Atom';
import { resultsState } from './Atom';
import { Link } from 'react-router-dom';

const RecentSearches = () => {
  const [results, setResults] = useRecoilState(resultsState);
  const [history, setHistory] = useState([])
  const Authorization = useRecoilValue(loginState);
  // const setRecentSearches = useSetRecoilState(recentSearchesState);

  const recentSearches = () => {
    axios.get(`${process.env.REACT_APP_API}/api/search/recent`, {
      headers: { Authorization: Authorization}
    })
    .then((response)=>{
      if (response.data !== null) {
        setHistory(response.data.data) // 필요 시 수정
        console.log(response.data.data)
      }
    })
    .catch((err) => {
      console.log(err)
    })
    return 
  };

  useEffect(() => {
    recentSearches();
  }, []);


  const handleRemoveRecentSearch = (keyword) => {
    axios.delete(`${process.env.REACT_APP_API}/api/search/recent`, {
      headers: { Authorization: Authorization},
      keyword: `${keyword}`
    })
    .then((response)=>{
      console.log(response.data.data)
      recentSearches()
      })
    return 
  };

  const handleSearchFromRecent = (keyword) => {
    console.log(`검색어 "${keyword}"로 검색을 수행합니다.`); 
    setResults({});
    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=0&type=feed&keyword=${keyword}`,
      {
        headers: { Authorization: Authorization}
      }
    )
    .then((response)=>{
      console.log(response.data.data.feed)
      setResults(response.data.data.feed)
    })
  };

  return (
    <div className={styles['recent-searches']}>
      <h3>최근 검색어</h3>
        <ul>
          {history && history.slice(-10).reverse().map((item, index) => (
            <li key={index} className={styles.li}>
              <Link to='/result'><span onClick={() => handleSearchFromRecent(item.keyword)} >{item.keyword}</span></Link>
              <button onClick={() => handleRemoveRecentSearch(item.keyword)}>X</button>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default RecentSearches;

