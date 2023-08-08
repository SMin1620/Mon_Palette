import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchResultFeed.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';

function SearchResultFeed({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  const Authorization = useRecoilValue(loginState);
  const searchQuery = new URLSearchParams(location.search).get('query');

  const [resultData, setResultData] = useState(data.feed || []);
  const [feedPage, setFeedPage] = useState(0);
  const obsRef = useRef(null);
  const endRef = useRef(false);

  const loadMoreData = () => {
    if (endRef.current) return;

    axios.get(
      `${process.env.REACT_APP_API}/api/search?page=${feedPage}&type=feed&keyword=${searchQuery}`,
      {
        headers: { Authorization: Authorization }
      }
    )
    .then(response => {
      const feedData = response.data.data.feed;
      if (feedData && feedData.length === 0) {
        endRef.current = true;
      } else {
        setResultData(prev => [...prev, ...feedData]);
        setFeedPage(prev => prev + 1);
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  };

  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObs, { threshold: 0.1 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => observer.disconnect();
  }, []);

  const goDetail = (id) => {
    return navigate(`/feed/${id}`);
  };

  return (
    <div className={styles["feedMain_body"]}>
      <div className={styles["feedMain_body_info"]}>
        <div className={styles["feedMain_body_container"]}>
          {resultData.map((item, index) => (
            <div key={index} className={styles["feedMain_body_info_item"]} onClick={() => goDetail(item.id)}>
              <div>
                <img src={item.feedImages[0].imagePath} alt="" onClick={() => goDetail(item.id)} className={styles["feedMain_body_info_item_top"]} />
                <div className={styles["feedMain_body_info_item_bottom"]}>
                  <img src={item.user.profileImage} alt={item.user.name} />
                  <p>{item.user.nickname}</p>
                </div>
              </div>
            </div>
          ))}
          <li ref={obsRef} className={styles.loadingIndicator}>
            Loading more...
          </li>
        </div>
      </div>
    </div>
  );
}

export default SearchResultFeed;
