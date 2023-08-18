import React from 'react';
import styles from './PaymentFailed.module.css';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
    const navigate = useNavigate();
    return <div className={styles.container}>
        <div>결제가 실패하였습니다!</div>
        <div onClick={()=>navigate('/home')} className={styles.button}>홈으로 가기</div>
    </div>
};

export default PaymentFailed;