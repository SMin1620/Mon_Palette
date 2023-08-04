import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { recentSearchesState } from './Atom';
import styles from './SearchInput.module.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import axios from 'axios';
import { loginState } from '../user/components/Atom/loginState';
import { resultsState } from './Atom';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Autocomplete from './AutoComplete';

const SearchInput = () => {
  // const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);
  const Authorization = useRecoilValue(loginState);
  // const [results, setResults] = useRecoilState(resultsState);
  const [fromSearchResults, setFromSearchResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const query = searchParams.get('query') || '';

  const handleSearch = (query) => {
    // setResults({});
    // setRecentSearches((prevSearches) => [...prevSearches, query]);
    console.log(`${query}로 검색을 수행합니다.`)
    setShowSuggestions(false);

    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=0&type=feed&keyword=${query}`,
      {
        headers: { Authorization: Authorization }
      }
    )
    .then((response) => {
      // console.log(response.data.data)
      // setResults(response.data.data.feed)
      navigate(`/result?query=${query}`);
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (query !== '') {
      handleSearch(query);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchParams({ query: suggestion });
    handleSearch(suggestion);
    setSuggestions([]);
  };

  const autocomplete = (value) => {
    if (value) {
      axios.get(`${process.env.REACT_APP_API}/api/search/auto?keyword=${value}`, {
        headers: { Authorization: Authorization }
      })
      .then((response) => {
        const suggestions = response.data.data.map((item) => ({
          nickname: item.nickname,
          profileImage: item.profileImage,
        }));
        setSuggestions(suggestions);
        setShowSuggestions(true);
      })
      .catch(err => console.log(err))
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const path = window.location.pathname;
    setFromSearchResults(path.startsWith('/result'));
  }, []);

  useEffect(() => {
    if (query) {
      autocomplete(query);
    }
  }, [query]);

  return (
    <div className={styles.div}>
    <div className={styles['input-container']}>
      <Link to={fromSearchResults ? '/search/' : '/'} className={styles.link}>
      <ArrowCircleLeftOutlinedIcon className={styles.back} />
      </Link>
      <input className={styles['search-input']}
        type="text"
        value={query}
        onChange={(e) => {
          setSearchParams({ query: e.target.value });
          autocomplete(e.target.value); 
          }
        }
        placeholder='검색어를 입력하세요'
      />
      <button className={styles['search-btn']} onClick={handleClick}>
      <SearchOutlinedIcon className={styles.image}/>
      </button>
    </div>
    {showSuggestions && suggestions?.length > 0 && <Autocomplete suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />}
    </div>
  );
};

export default SearchInput;
