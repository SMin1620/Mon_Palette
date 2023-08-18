import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchResultUser.module.css';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { PropagateLoader } from 'react-spinners';
import axios from 'axios';

const SearchResultUser = ({ query }) => {
    const navigate = useNavigate();
    const Authorization = useRecoilValue(loginState);
    const [resultData, setResultData] = useState([]); 
    const [userPage, setUserPage] = useState(0);
    const [load, setLoad] = useState(true);
    const endRef = useRef(false);
    const obsRef = useRef(null);
    const [loading, setLoading] = useState(false);


    const handleObs = (entries) => {
        const target = entries[0];
        if (!endRef.current && target.isIntersecting) {
            setLoading(true);
            setUserPage((prevPage) => prevPage + 1);
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
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };


    useEffect(() => {
        setResultData([]);
        fetchUserData(0);  
    }, [query]);

    useEffect(() => {
        if (userPage > 0) {  
            fetchUserData(userPage);
        }

        const observer = new IntersectionObserver(handleObs, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);

        return () => { observer.disconnect(); }; 
    }, [userPage]);



    const handleUserClick = (id) => {
        navigate(`/userpage/${id}`);
      };


    
    return (
        <div className={styles.wrap}>
            {resultData && resultData.length>0 && resultData.map((userdata, index)=>{
                return <div key={index} className={styles.container} onClick={() => handleUserClick(userdata.id)}>
                    <img className={styles.img} src={userdata.profileImage} />
                    <div className={styles.nickname}> {userdata.nickname} </div>
                </div>
            })}
            {load ? 
                <div className="observer_spinner" ref={obsRef}>
                    <PropagateLoader color='#fdf2f7'/>
                </div>
                :
                <div ref={obsRef}></div>
            }
        </div>
    )
};

export default SearchResultUser;