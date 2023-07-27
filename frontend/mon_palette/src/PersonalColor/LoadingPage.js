import React from 'react';
import styles from './LoadingPage.module.css'

const LoadingPage = () => {
  return (
    <div>
      <h3>분석 중...</h3>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingPage;
