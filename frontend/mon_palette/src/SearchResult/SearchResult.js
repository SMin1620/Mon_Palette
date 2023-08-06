import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styles from './SearchResult.module.css'
import SearchResultShop from './SearchResultShop';
import SearchResultFeed from './SearchResultFeed';
import SearchResultChallenge from './SearchResultChallenge';
import SearchResultUser from './SearchResultUser'
import { loginState } from '../user/components/Atom/loginState';
import SearchInput from '../Search/SearchInput'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const Authorization = useRecoilValue(loginState);
  const [resultPage, setResultPage] = useState(null);
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('query');

  const handleSearch = (type) => {
    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=0&type=${type}&keyword=${searchQuery}`,
      {
        headers: { Authorization: Authorization }
      }
    )
    .then((response) => {
      switch(type) {
        case "shop":
          setResultPage(<SearchResultShop data={response.data.data}/>)
          break;
        case "feed":
          setResultPage(<SearchResultFeed data={response.data.data}/>)
          break;
        case "challenge":
          setResultPage(<SearchResultChallenge data={response.data.data}/>)
          break;
        case "user":
          setResultPage(<SearchResultUser data={response.data.data}/>)
          break;
        default:
          break;
      }
    })
  };

  useEffect(() => {
    handleSearch("feed");
  }, [searchQuery]); 

  return (
    <div >
      <div className={styles['search-container']}>
      <SearchInput/>
      </div>
    <div className={styles["search_result"]}>
      <div className={styles["search_result_top"]}>
        <div className={styles["search_result_page"]} onClick={() => {
          handleSearch("shop");
        }}>
          한정 판매
        </div>

        <div className={styles["search_result_page"]} onClick={() => {
          handleSearch("feed");
        }}>
          Feed
        </div>

        <div className={styles["search_result_page"]} onClick={() => {
          handleSearch("challenge");
        }}>
          Challenge
        </div>

        <div className={styles["search_result_page"]} onClick={() => {
          handleSearch("user");
        }}>
          User
        </div>
      </div>

      {/* <div className={styles["search_result_body"]}> */}
        {resultPage}
      {/* </div> */}
    </div>
    </div>
  );
}

export default SearchResult;
