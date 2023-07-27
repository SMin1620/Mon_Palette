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
    }, 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target)
    setUploadedImage(file);
  };

  return (
    <div className={styles['container']}>
      {!isLoading && !showResultPage && (
        <div className={styles['button-container']}>
          {uploadedImage ? (
            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={{ width: '200px', height: '200px', objectFit: 'cover' }}/>
          ) : (
            <div className={styles['uploaded-image-container']}></div>
          )}
          <label className={styles['upload-btn']}>
            이미지 업로드
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
          <button className={styles.button} onClick={handleStartLoading}>검사 시작</button>
        </div>
      )}
      {isLoading && <LoadingPage />}
      {showResultPage && <ResultPage />}
    </div>
  );
};

export default StartPage;