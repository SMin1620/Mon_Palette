import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { recentSearchesState, searchQueryState } from './Atom';
import styles from './SearchInput.module.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import axios from 'axios';
import { loginState } from '../user/components/Atom';
import { resultsState } from './Atom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Autocomplete from './AutoComplete';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const Authorization = useRecoilValue(loginState);
  const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);
  const [results, setResults] = useRecoilState(resultsState);
  const location = useLocation();
  const [fromSearchResults, setFromSearchResults] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (query) => {
    setResults({});
    setRecentSearches((prevSearches) => [...prevSearches, query]);
    console.log(`${query}로 검색을 수행합니다.`)
    setShowSuggestions(false);
  
    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=0&type=feed&keyword=${query}`,
      {
        headers: { Authorization: Authorization }
      }
    )
    .then((response) => {
      console.log(response.data.data)
      setResults(response.data.data.feed)
      navigate("/result");
    })
  };
  

  const handleClick = (event) => {
    event.preventDefault();
    if (searchQuery !== '') {
      handleSearch(searchQuery);
    }
  };


  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
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
    if (!location.pathname.startsWith('/result')) {
      setSearchQuery('');
    }
    setFromSearchResults(location.pathname.startsWith('/result'));
  }, [location]);

  
  return (
    <div className={styles.div}>
    <div className={styles['input-container']}>
      <Link to={fromSearchResults ? '/search/' : '/'} className={styles.link}>
      <ArrowCircleLeftOutlinedIcon className={styles.back} />
      </Link>
      <input className={styles['search-input']}
        type="text"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
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
