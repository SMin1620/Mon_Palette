import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../user/components/Atom/loginState';
import * as PortOne from '@portone/browser-sdk/v2';

const Payment = ({ orderData }) => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const Authorization = useRecoilValue(loginState);
    const mainAddress = userInfo.find(address => address.isMain === 1);

    function openPaymentWindow() {
        PortOne.requestPayment({
          storeId: 'store-4ff4af41-85e3-4559-8eb8-0d08a2c6ceec',
          paymentId: 'paymentId_{now()}',
          orderName: '나이키 와플 트레이너 2 SD',
          totalAmount: 1000,
          currency: 'KRW',
          pgProvider: 'KAKAOPAY',
          payMethod: "CARD",
          callback: handlePaymentResponse  
        });
    }
      
    async function handlePaymentResponse(response) {
        if (response.code !== null) {
            return alert(response.message);
        }

        const validationResult = await axios({
            url: `${process.env.REACT_APP_API}/api/order`,
            method: "POST",
            headers: {
                Authorization: Authorization,
            },
            data: {
                txId: response.txId,
                paymentId: response.paymentId,
            },
        });

        if (validationResult.data === true) {
            navigate('/paymentsucceed')
        } else {
            navigate('/paymentfailed');
        }
    }

    const calculateTotalPrice = () => {
        let total = 0;

        orderData.brands.forEach(brand => {
            brand.products.forEach(product => {
                product.options.forEach(option => {
                    total += product.price * option.quantity;
                });
            });
        });

        return total;
    };

    const totalPrice = calculateTotalPrice();

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API}/api/address`,
            { headers: { Authorization: Authorization } }
        )
        .then(response => {
            setUserInfo(response.data.data);
        })
        .catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles["item_container"]}>
                <div>주문상품</div>
                <div>
                    {orderData.brands.map((brand, brandIdx) => (
                        <div key={brandIdx}>
                            <h3>브랜드: {brand.name}</h3>
                            {brand.products.map((product, productIdx) => (
                                <div key={productIdx}>
                                    <img src={product.feedImages[0].imagePath} alt={product.name} />
                                    <h4>상품: {product.name}</h4>
                                    <div>가격: {product.price}</div>
                                    <div>
                                        옵션: 
                                        {product.options.map((option, optionIdx) => (
                                            <div key={optionIdx}>
                                                <p>{option.name}</p>
                                                <p>{option.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles["address_container"]}>
                <div>
                    <p>배송지 정보</p>
                    <div onClick={() => navigate('/changeaddress')}>변경</div>
                </div>
                <div>
                    <div>
                        <div>{mainAddress ? mainAddress.receiver : ""}</div>
                        <div>{mainAddress ? mainAddress.phone : ""}</div>
                    </div>
                    <div>{mainAddress ? mainAddress.zipcode : ""}</div>
                    <div>{mainAddress ? mainAddress.address : "주소가 설정되지 않았습니다."}</div>
                </div>
            </div>
            <div className={styles["price_container"]}>
                <div>결제 금액</div>
                <div>
                    <div>총 결제금액</div>
                    <div>{totalPrice}</div>
                </div>
            </div>
            <div className={styles.purchase}>
                <div onClick={openPaymentWindow}>구매하기({totalPrice}원)</div>
            </div>
        </div>
    );
};

export default Payment;
