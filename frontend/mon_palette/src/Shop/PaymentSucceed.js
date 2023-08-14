import React from 'react';
import styles from './PaymentSucceed.module.css';
import { useNavigate } from 'react-router-dom';

const PaymentSucceed = () => {
    const navigate = useNavigate()
    return <div className={styles.container}>
        <div>
            결제가 성공하였습니다!
        </div>
        <div className={styles.button} onClick={() => navigate('/home')}>홈으로 가기</div>
    </div>
};

export default PaymentSucceed;