import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchResultChallenge.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';

const SearchResultChallenge = ({ initialData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const Authorization = useRecoilValue(loginState);
  const [resultData, setResultData] = useState(initialData.challenge || []);
  const [challengePage, setChallengePage] = useState(0);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  const searchQuery = new URLSearchParams(location.search).get('query');
  
  const loadMoreData = () => {
    if (endRef.current) return;
    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=${challengePage}&type=challenge&keyword=${searchQuery}`, 
      {
         headers: { Authorization: Authorization } 
        })
      .then(response => {
        const data = response.data.data.challenge;      
        if (data && data.length === 0) {
          endRef.current = true;
        } else {
          setResultData(prev => [...prev, ...data]);
          setChallengePage(prev => prev + 1);
        }
      })
      .catch(error => {
        console.error("Failed to load more data", error);
      });
  };

  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObs, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChallengeClick = (id) => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div className={styles.wrap}>
    <div className={styles.resultContainer}>
      {resultData.map((challenge, index) => (
        <div key={index} className={styles["challengeHome_bottom_info_item"]} onClick={() => handleChallengeClick(challenge.id)}>
          <video src={challenge.video} className={styles.videoItem} />
        </div>
      ))}
      <div ref={obsRef} className={styles.loadingIndicator}>Loading...</div>
    </div>
    </div>
  );
}

export default SearchResultChallenge;
