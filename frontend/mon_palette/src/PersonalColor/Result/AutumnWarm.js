import React from 'react';
import styles from './AutumnWarm.module.css';
import { Link } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { useNavigate } from 'react-router-dom';



const AutumnWarm = ({ handleRestart }) => {
  // const navigate = useNavigate();

    const BackendResponseExample = () => {
      return(
    <div className={styles['backend-response-container']}>
        <div className={styles['backend-response']}>
            Fall
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
        <div className={styles.hashtag}>#분위기 맛집 #따뜻한 #침착한</div>
        <div className={styles.description}>
        Best : 
        <div className={styles.color}> 캐멀색, 베이지색, 주황색, 금색, 밤색</div>
        </div>
        <div className={styles.description}> 
        Worst : 
        <div className={styles.color}> 순백색, 검정색, 흰 기가 강한 파스텔 색상</div>
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
                {/* <img src="./summer.png"></img> */}
                <BackendResponseDescription />
              </div>  
                <Link className={styles.button}>
                  <button className={styles.button2} onClick={handleRestart}>
                    Restart
                  </button>
                </Link>
            </div>
            </div>
          )
};

export default AutumnWarm;





