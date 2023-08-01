import React from 'react';
import styles from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textcontainer}>
      <div className={styles.text}>Please</div>
      <div className={styles.text}>wait</div>
      <div className={styles.text}>for</div>
      <div className={styles.text}>your</div>
      <div className={styles.text}>Palette</div>
      </div>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingPage;
