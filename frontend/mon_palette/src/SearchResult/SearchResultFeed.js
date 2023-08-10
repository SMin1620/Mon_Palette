import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './SearchResultFeed.module.css';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { PropagateLoader } from 'react-spinners';

function SearchResultFeed({ query }) {
    const navigate = useNavigate();
    const Authorization = useRecoilValue(loginState);

    const [resultData, setResultData] = useState([]);
    const [feedPage, setFeedPage] = useState(0);
    const [load, setLoad] = useState(true);
    const endRef = useRef(false);
    const obsRef = useRef(null);

    const handleObs = (entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting) {
            setFeedPage((prevPage) => prevPage + 1);
        }
    };

    const fetchFeedData = async (page) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/api/search?page=${page}&type=feed&keyword=${query}`,
                {
                    headers: { Authorization: Authorization }
                }
            );

            if (response.data.data.feed.length !== 10) {
                endRef.current = true;
                setLoad(false);
            }

            setResultData(prev => [...prev, ...response.data.data.feed]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFeedData(0);  
        setResultData([]);
    }, [query]);

    useEffect(() => {
        if (feedPage > 0) {  
            fetchFeedData(feedPage);
        }

        const observer = new IntersectionObserver(handleObs, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);

        return () => { observer.disconnect(); }; 
    }, [feedPage]);

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
                    {load ? 
                        <div className="observer_spinner" ref={obsRef}>
                            <PropagateLoader color='#fdf2f7'/>
                        </div>
                        :
                        <div ref={obsRef}></div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchResultFeed;
