import React, { useState } from 'react';
import './SearchResult.css'
import SearchResultShop from './SearchResultShop';
import SearchResultFeed from './SearchResultFeed';
import SearchResultChallenge from './SearchResultChallenge';

function SearchResult() {
  const [resultPage, setResultPage] = useState(<SearchResultShop/>)

  return (
    <div className="search_result">
      <div className="search_result_top">
        <div className="search_result_page" onClick={() => {
          setResultPage(<SearchResultShop/>)
        }}>
          한정 판매
        </div>

        <div className="search_result_page" onClick={() => {
          setResultPage(<SearchResultFeed/>)
        }}>
          Feed
        </div>

        <div className="search_result_page" onClick={() => {
          setResultPage(<SearchResultChallenge/>)
        }}>
          Challenge
        </div>
      </div>

      <div className="search_result_body">
        {resultPage}
      </div>
    </div>
  );
}

export default SearchResult;