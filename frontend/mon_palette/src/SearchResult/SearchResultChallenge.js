import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchResultChallenge.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { PropagateLoader } from 'react-spinners';

const SearchResultChallenge = ({ query }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const Authorization = useRecoilValue(loginState);
  const [resultData, setResultData] = useState([]);
  const [challengePage, setChallengePage] = useState(0);
  const [load, setLoad] = useState(true);
  const obsRef = useRef(null);
  const endRef = useRef(false);
  
const handleObs = (entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting) {
            setChallengePage((prevPage) => prevPage + 1);
        }
    };

    const fetchUserData = async (page) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/search?page=${page}&type=user&keyword=${query}`,
                {
                    headers: { Authorization: Authorization }
                }
            );

            if (response.data.data.user.length !== 10) {
                endRef.current = true;
                setLoad(false);
            }

            setResultData(prev => [...prev, ...response.data.data.user]);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
      setResultData([]);
        fetchUserData(0);  
    }, [query]);

    useEffect(() => {
        if (challengePage > 0) {  
            fetchUserData(challengePage);
        }

        const observer = new IntersectionObserver(handleObs, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);

        return () => { observer.disconnect(); }; 
    }, [challengePage]);

  const handleChallengeClick = (id) => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div className={styles.wrap}>
    <div className={styles.resultContainer}>
      {resultData && resultData.length>0 && resultData.map((challenge, index) => (
        <div key={index} className={styles["challengeHome_bottom_info_item"]} onClick={() => handleChallengeClick(challenge.id)}>
          <video src={challenge.video} className={styles.videoItem} />
        </div>
      ))}
      {load ? 
          <div className="observer_spinner" ref={obsRef}>
              <PropagateLoader color='#fdf2f7'/>
          </div>
          :
          <div ref={obsRef}></div>
      }
    </div>
    </div>
  );
}

export default SearchResultChallenge;
