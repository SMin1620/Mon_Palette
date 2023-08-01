import React, { useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import SpringWarm from './Result/SpringWarm';
import SummerCool from './Result/SummerCool';
import AutumnWarm from './Result/AutumnWarm';
import WinterCool from './Result/WinterCool';
import styles from './StartPage.module.css';

const StartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [season, setSeason] = useState(null);
  
  const handleStartLoading = () => {
    if (!uploadedImage) {
      return;
    }
    setIsLoading(true);
    // 여기서 나중에 백엔드와 통신하는 코드를 수행
    // 통신이 완료된 후 결과를 받아올 것이라고 가정하겠습니다.
    // 이 결과로 'season' 값을 결정하고 'showResultPage' 상태를 설정합니다.
    const responseFromBackend = 'summer'; // 실제 API 응답값으로 대체해야 합니다.

    // 통신이 완료되었으므로 결과값을 활용하여 상태를 업데이트합니다.
    setSeason(responseFromBackend);
    setIsLoading(false);
    setShowResultPage(true);
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div>
      {!isLoading && !showResultPage && (
        <div className={styles['button-container']}>
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
        </div>
      )}
      {isLoading && <LoadingPage />}
      {season === 'spring' && <SpringWarm />}
      {season === 'summer' && <SummerCool />}
      {season === 'autumn' && <AutumnWarm />}
      {season === 'winter' && <WinterCool />}
    </div>
  );
};

export default StartPage;
