import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from './RecentSearches.module.css'; 
import axios from "axios";
import { loginState } from '../user/components/Atom/loginState';
import { resultsState } from './Atom';
import { Link, useNavigate } from 'react-router-dom';

const RecentSearches = () => {
  const [results, setResults] = useRecoilState(resultsState);
  const [history, setHistory] = useState([])
  const Authorization = useRecoilValue(loginState);
  const navigate = useNavigate();

  const recentSearches = () => {
    axios.get(`${process.env.REACT_APP_API}/api/search/recent`, {
      headers: { Authorization: Authorization}
    })
    .then((response)=>{
      if (response.data !== null) {
        setHistory(response.data.data) // 필요 시 수정
        // console.log( response.data.data)
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
    console.log(keyword);
    axios.post(`${process.env.REACT_APP_API}/api/search/recent`, {
      keyword: keyword,
      },{
        headers: { Authorization: Authorization },
      })
    
    .then((response)=>{
      // console.log(response)
      recentSearches()
      })
    .catch(err => 
      console.log(err)) 
  };

  const handleSearchFromRecent = (keyword) => {
    if (keyword.trim() === '') {
      console.log('검색어가 없습니다.');
      return;
    }
    console.log(`검색어 "${keyword}"로 검색을 수행합니다.`); 
    navigate(`/result?query=${keyword}`);
  };

  return (
    <div className={styles['recent-searches']}>
      <h3>최근 검색어</h3>
        <ul>
          {history && history
            .filter(item => item.keyword.trim() !== '')
            .slice(0,10)
            .map((item, index) => (
              <li key={index} className={styles.li}>
                <Link to={`/result?query=${item.keyword}`} style={{textDecoration: "none"}}><span onClick={() => handleSearchFromRecent(item.keyword)} >{item.keyword}</span></Link>
                <button onClick={() => handleRemoveRecentSearch(item.keyword)}>X</button>
              </li>
            ))}
        </ul>
    </div>
  );
  

};

export default RecentSearches;
