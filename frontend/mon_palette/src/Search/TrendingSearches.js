import React, { useState, useEffect } from 'react';
import styles from './TrendingSearches.module.css';
import axios from "axios";
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue, useRecoilState } from "recoil";
import { resultsState, searchQueryState } from './Atom';
import { useNavigate } from 'react-router-dom';



const TrendingSearches = () => {
    const [TrendingWords, setTrendingWords] = useState([]);
    const Authorization = useRecoilValue(loginState);
    const [results, setResults] = useRecoilState(resultsState);
    const Navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    
    const handleSearchFromTrending = (search) => {
        console.log(`검색어 "${search}"로 검색을 수행합니다.`);
        setResults({});
        axios.get(
            `${process.env.REACT_APP_API}/api/search?page=0&type=feed&keyword=${search}`,
            {
              headers: { Authorization: Authorization}
            }
          )
          .then((response)=>{
            // console.log(response.data.data.feed)
            setResults(response.data.data.feed)
            Navigate('/result');
            setSearchQuery(search);
          })
      };
    const getlist = () => {
        axios.get(`${process.env.REACT_APP_API}/api/search/ranking`, {
            headers: { Authorization: Authorization}
        })
        .then((response)=>{
            // console.log(response.data.data)
            if (response.data !== null) {
            setTrendingWords(response.data.data) // 필요 시 수정
            }
        })
        return 
        };

    useEffect(() => {
        getlist();
      }, []);
      
      if (!TrendingWords || TrendingWords.length === 0) {
          return <div className={styles['trending-searches']}>
          <h3>실시간 랭킹</h3>
      </div>
        }  
        
      
      return (
          <div>
            <div className={styles['trending-searches']}>
                <h3>실시간 랭킹</h3>
            </div>
            <ul className={styles.ul}>
                {TrendingWords.map((item, index) => (
                    <li key={index} onClick={ () =>handleSearchFromTrending(item.keyword) }  >
                        <span className={styles.span}>{index + 1}.</span> 
                        <div className={styles.li}>{item.keyword}</div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default TrendingSearches;


