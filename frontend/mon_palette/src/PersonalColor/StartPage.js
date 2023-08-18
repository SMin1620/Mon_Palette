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


const StartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [season, setSeason] = useState(null);
  const Authorization = useRecoilValue(loginState);

  useEffect(() => {
    return () => {
      setUploadedImage(null);
      setSeason(null);
    };
  }, []);

  const handleStartLoading = () => {
    if (!uploadedImage) {
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', uploadedImage);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/django/personal`,
      // mode: "cors",
      headers: {
        "Content-Type": "multipart/form-data", 
      },
      data: formData,  
    })
    .then((response)=>{
      console.log(response)
      setSeason(response.data.personal);
      console.log(season)
      setIsLoading(false);
      setShowResultPage(true);

      axios.put(`${process.env.REACT_APP_API}/api/personal`,
        {
          body : {personalColor: response.data.personal},
        },
        {
          headers: {Authorization: Authorization} 
        }
      )      
      .then((res) => 
      console.log(res))
      .catch((err)=>
      console.log(err))
    })
    .catch(err => console.log(err)) 
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  const handleRestart = () => {
    setUploadedImage(null);
    setSeason(null);
    setIsLoading(false);
    setShowResultPage(false);
  };

  return (
    <div>
      {!isLoading && !showResultPage && (
        <div className={styles['button-container']}>
          <Link to="/home"><CloseOutlinedIcon className={styles.exit} /></Link>
          {uploadedImage ? (
            <img className={styles.image} src={URL.createObjectURL(uploadedImage)} alt="Uploaded" />
          ) : (
            <div className={styles['text-container']}>
              <div className={styles.text}>What's</div>
              <div className={styles.text}>your</div>
              <div className={styles.text}>palette?</div>
            </div>
          )}
          <button className={styles.button1} onClick={handleButtonClick}>
            Upload
          </button>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button className={styles.button2} onClick={handleStartLoading} disabled={!uploadedImage}>
            Start
          </button>
          <div className={styles.explain}>
            <p>어둡지 않은 곳에서 촬영하되</p> 
            <p>눈, 코, 입이 다 잘 나온 사진을 사용해주세요!</p>
          </div>
          
        </div>
      )}
      {isLoading && <LoadingPage />}
      {season === '봄웜톤' && <SpringWarm handleRestart={handleRestart}/>}
      {season === '여름쿨톤' && <SummerCool handleRestart={handleRestart}/>}
      {season === '가을웜톤' && <AutumnWarm handleRestart={handleRestart}/>}
      {season === '겨울쿨톤' && <WinterCool handleRestart={handleRestart}/>}
    </div>
  );
};

export default StartPage;
