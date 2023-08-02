import React from 'react';
import styles from './SummerCool.module.css';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const SummerCool = () => {
    const BackendResponseExample = () => {
      return(
    <div className={styles['backend-response-container']}>
        <div className={styles['backend-response']}>
            summer
        </div>
        <div className={styles['backend-response']}>
            cool
        </div>
    </div>
    )
  }
    const BackendResponseDescription = () => {
      return (
      <div className={styles['result']}>
        <div className={styles.hashtag}>#고전적 #시원 #부드러움</div>
        <div className={styles['result-description']}>
        <div className={styles.description}>
        Best : 화이트, 쿨아이보리, 그레이, 하늘색
        </div>
        <div className={styles.description3}> 
        Worst : 선명한 원색, 탁하고 짙은 색, 카키, 
        </div>
        <div className={styles.description2}>
        버건디
        </div>
      </div>        
    </div>
      )
    };

    return (
      <div className={styles.div}>
          <div className={styles.container}>
            <Link to="/"><CloseOutlinedIcon className={styles.exit} /></Link>
              <div className={styles.page1}>
                <div className={styles['text-container']}>
                  <div className={styles.text1}>Your</div>
                  <div className={styles.text}>Palette</div>
                  <div className={styles.text}>is...</div>
                </div>
                <BackendResponseExample />
              </div>
            </div>
            <div className={styles.page1}>
              <div className={styles['backend-response-scroll']}>
                <BackendResponseExample />
                <div className={styles.image}></div>
                <BackendResponseDescription />
              </div>  
                <Link className={styles.button}>
                  <button className={styles.button2}>
                    Restart
                  </button>
                </Link>
            </div>
          </div>
          )
};

export default SummerCool;





