import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { loginState } from '../../../user/components/Atom/loginState';

const Payment = ({ orderData }) => {
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate();
    const Authorization = useRecoilValue(loginState);
    const mainAddress = userInfo.find(address => address.isMain === 1);


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
            {
                headers: { Authorization: Authorization }
              }
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
                                    <img src={product.feedImages[0].imagePath} />
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
                    <div>
                        <div>{mainAddress ? mainAddress.receiver : ""}</div>
                        <div>{mainAddress ? mainAddress.phone : ""}</div>
                    </div>
                    <div>{mainAddress ? mainAddress.zipcode : ""}</div>
                    <div>{mainAddress ? mainAddress.address : "주소가 설정되지 않았습니다."}</div>
                </div>
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
                <div>구매하기({totalPrice}원)</div>
            </div>
        </div>
    );
};

export default Payment;
