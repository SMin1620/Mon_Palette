import React from 'react';
import styles from './SpringWarm.module.css';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';



const SpringWarm = ({ handleRestart }) => {
    const BackendResponseExample = () => {
      return(
    <div className={styles['backend-response-container']}>
        <div className={styles['backend-response']}>
            Spring
        </div>
        <div className={styles['backend-response']}>
            warm
        </div>
    </div>
    )
  }
    const BackendResponseDescription = () => {
      return (
        <div className={styles['result-description']}>
        <div className={styles.hashtag}>#화사 #따뜻 #부드러움</div>
        <div className={styles.description}>
        <div>Best :</div>
        <div className={styles.color}> 노란색이 선명한 핑크, 피치 그린, 살구색, 웜베이지</div> 
        </div>
        <div className={styles.description}> 
        <div>Worst :</div>
        <div className={styles.color}> 블랙, 차가운 화이트, 보라색, 실버 </div>
        </div>
    </div>
      )
    };


    return (
      <div className={styles.div}>
            <div className={styles.container}>
            <Link to="/home"><CloseOutlinedIcon className={styles.exit} /></Link>
              <div className={styles.page1}>
                <div className={styles['text-container']}>
                  <div className={styles.text1}>Your</div>
                  <div className={styles.text}>Palette</div>
                  <div className={styles.text}>is...</div>
                </div>
                <BackendResponseExample />
              </div>
            </div>
            <div className={styles.page2}>
              <div className={styles['backend-response-scroll']}>
                <BackendResponseExample />
                <div className={styles.image}></div>
                <BackendResponseDescription />
              </div>  
                <Link className={styles.button} >
                  <button className={styles.button2} onClick={handleRestart}> 
                    Restart
                  </button>
                </Link>
            </div>
            </div>
          )
};

export default SpringWarm;





