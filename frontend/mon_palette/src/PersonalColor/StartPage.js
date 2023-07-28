import React, { useState } from 'react';
import LoadingPage from './LoadingPage';
import ResultPage from './ResultPage';
import styles from './StartPage.module.css';

const StartPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const handleStartLoading = () => {
    if (!uploadedImage) {
      // 이미지를 업로드하지 않았을 경우에는 검사를 시작하지 않음
      return;
    }
    setIsLoading(true);
    // 여기에 나중에 백엔드와 통신하는 코드를 넣을 거임.
    setTimeout(() => {
      setIsLoading(false);
      setShowResultPage(true);
    }, 300000000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
  };

  const handleButtonClick = () => {
    // 버튼을 눌렀을 때 파일 선택 창 열기
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
      {showResultPage && <ResultPage />}
    </div>
  );
};

export default StartPage;
