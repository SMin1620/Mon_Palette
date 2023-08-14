import React, { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import SpringWarm from './Result/SpringWarm';
import SummerCool from './Result/SummerCool';
import AutumnWarm from './Result/AutumnWarm';
import WinterCool from './Result/WinterCool';
import styles from './StartPage.module.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';


const ResultPage = () => {
  const [showResultPage, setShowResultPage] = useState(false);
  const [season, setSeason] = useState(null);
  const Authorization = useRecoilValue(loginState);

  useEffect(() => {
    axios.get('/api/user/info', {
      headers: {
        Authorization: Authorization  
      }
    })
    .then((response) => {
      const userPersonalColor = response.data.personalcolor;
      if (userPersonalColor) {
        setSeason(userPersonalColor);  
        setShowResultPage(true);  
      } else {
        setSeason(null);
        setShowResultPage(true);
      }
    })
    .catch(err => console.log(err));
  }, [Authorization]);  

  return (
    <div>
      {showResultPage ? (
        <div>
          {season === '봄웜톤' && <SpringWarm />}
          {season === '여름쿨톤' && <SummerCool />}
          {season === '가을웜톤' && <AutumnWarm />}
          {season === '겨울쿨톤' && <WinterCool />}
          {season === null && <alert>퍼스널컬러 결과가 없습니다!</alert>}
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default ResultPage;
