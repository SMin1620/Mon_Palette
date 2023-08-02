import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { recentSearchesState } from './Atom';
import styles from './SearchInput.module.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import axios from 'axios';
import { loginState } from '../user/components/Atom';
import { resultsState } from './Atom';
import { Link, useLocation } from 'react-router-dom';
import Autocomplete from './AutoComplete';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const Authorization = useRecoilValue(loginState);
  const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);
  const [results, setResults] = useRecoilState(resultsState);
  const location = useLocation();
  const [fromSearchResults, setFromSearchResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = (event) => {
    if (searchQuery !== '') {
      setResults({});
      setRecentSearches((prevSearches) => [...prevSearches, searchQuery]);
      console.log(`${searchQuery}로 검색을 수행합니다.`)
      // setSearchQuery('');
      axios.get(
        `${process.env.REACT_APP_API}/api/search?page=0&type=feed&keyword=${searchQuery}`,
        {
          headers: { Authorization: Authorization}
        }
      )
      .then((response)=>{
        console.log(response.data)
        setResults(response.data)
      })

    } else {
      event.preventDefault();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const autocomplete = (value) => {
    setSearchQuery(value);
    axios.get( `${process.env.REACT_APP_API}/api/search/auto?keyword=${value}`,
    {
      headers: { Authorization: Authorization }
    })
    .then((response)=>{
      console.log(response.data)
      setSuggestions(response.data.nickname)
    })
  };
  

  useEffect(() => {
    setFromSearchResults(location.pathname.startsWith('/search-results'));
  }, [location]);

  return (
    <div>
    <div className={styles['input-container']}>
      <Link to={fromSearchResults ? '/search/' : '/'}>
      <ArrowCircleLeftOutlinedIcon className={styles.back} />
      </Link>
      <input className={styles['search-input']}
        type="text"
        value={searchQuery}
        onChange={(e) => autocomplete(e.target.value)}
        placeholder='검색어를 입력하세요'
      />
      <Link to="/result"> 
      <button className={styles['search-btn']} onClick={handleSearch}>
        <SearchOutlinedIcon className={styles.image}/>
      </button>
      </Link>
    </div>
    <Autocomplete suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />
    </div>
  );
};

export default SearchInput;
