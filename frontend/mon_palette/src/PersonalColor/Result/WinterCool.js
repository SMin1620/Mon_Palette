import React from 'react';
import styles from './WinterCool.module.css';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const WinterCool = ({ handleRestart }) => {
    const BackendResponseExample = () => {
      return(
    <div className={styles['backend-response-container']}>
        <div className={styles['backend-response']}>
            Winter
        </div>
        <div className={styles['backend-response']}>
            cool
        </div>
    </div>
    )
  }
    const BackendResponseDescription = () => {
      return (
      <div className={styles['result-description']}>
        <div className={styles.hashtag}>#화려한 #맑은 #시원한</div>
        <div className={styles.description}>
        <div>Best : </div>
        <div className={styles.color}> 와인색, 엽색, 흰색, 검은색</div>
        </div>
        <div className={styles.description}> 
        <div>Worst : </div>
        <div className={styles.color}> 황색, 오렌지, 갈색조, 탁한 색조</div>
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
                {/* <BackendResponseExample /> */}
                <div className={styles.image}></div>
                {/* <img src="./summer.png"></img> */}
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

export default WinterCool;





