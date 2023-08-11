import React, { useState, useEffect } from 'react';
import styles from './Payment.module.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { loginState } from '../user/components/Atom/loginState';
import * as PortOne from '@portone/browser-sdk/v2';

const Payment = () => {
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();
    const Authorization = useRecoilValue(loginState);
    const mainAddress = userInfo.find(address => address.isMain === 1);
    // const {IMP} = window; 
    // IMP.init("imp66584242"); 
    const orderData = {
        brands: [
            {
                name: "BrandA",
                products: [
                    {
                        name: "ProductA1",
                        price: 100,
                        options: [
                            { name: "OptionA1", quantity: 2 },
                            { name: "OptionA2", quantity: 3 }
                        ]
                    },
                    {
                        name: "ProductA2",
                        price: 200,
                        options: [
                            { name: "OptionA3", quantity: 1 }
                        ]
                    }
                ]
            },
            {
                name: "BrandB",
                products: [
                    {
                        name: "ProductB1",
                        price: 50,
                        options: [
                            { name: "OptionB1", quantity: 5 }
                        ]
                    }
                ]
            }
        ]
    };


    function openPaymentWindow() {
        // console.log("openPaymentWindow called");
        const response = PortOne.requestPayment({
          storeId: 'store-179baf9b-4048-4f05-90b7-ec5d44e298d4',
          channelKey: "channel-key-cdbcf2cf-3157-494d-b499-f8f1dd97dd2e",
          paymentId: 'paymentswserafawaewfs_{now()}',
          orderName: '나이키 와플 트레이너 2 SD',
          totalAmount: totalPrice,
          currency: 'KRW',
          pgProvider: 'KAKAOPAY',
          payMethod: "EASY_PAY",
          windowType: {
            "pc": "IFRAME",
          },
        //   customer: {
        //     customerId: 'customerId_now',
        //     fullName: '신현성',
        //     phoneNumber: '1670-5176',
        //     email: 'test@portone.io',
        //     address: '성수이로 길 16 JK타워 3층',
        //     zipcode: '04783',
        //   },
          redirectUrl: "http://192.168.30.220:3000/home",
        //   callback: handlePaymentResponse  
        })
        .then(function (response) {
            console.log(response)
            if (response.code !== null) {
                return alert(response.message);
            }
        
            axios.post(`${process.env.REACT_APP_API}/api/order`,
                {
                    data: {item : orderData},
                },
                {
                    headers: { Authorization: Authorization },
                }
            )
            .then(validationResult => {
                console.log(validationResult);
                if (validationResult.data === true) {
                    navigate('/paymentsucceed');
                } else {
                    navigate('/paymentfailed');
                }
            })
            .catch(err => {
                console.log(err);
            });
          });
      
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
            console.log(response.data)
        })
        .catch(error => {
            console.error("Error fetching user info:", error);
        });
    }, []);
    
    return (
        <div className={styles.container}>
            <div className={styles["item_container"]}>
                <div className={styles.title}>주문상품</div>
                <div>
                    {orderData.brands.map((brand, brandIdx) => (
                        <div key={brandIdx} className={styles.brandbycontainer}>
                            <div className={styles.brand}>{brand.name}</div>
                            {brand.products.map((product, productIdx) => (
                                <div key={productIdx} >
                                    <div className={styles.product}>
                                    <img className={styles.img} src={product.feedImages ? product.feedImages[0].imagePath : null} alt={product.name} />
                                    <div className={styles["product-info"]}> 
                                        <h4 className={styles.productname}>{product.name}</h4>
                                        <div>가격: {product.price}</div>
                                    </div>
                                    </div>
                                    <div className={styles.options}>
                                        option: 
                                        <div className={styles["option_container"]}>
                                        {product.options.map((option, optionIdx) => (
                                            <div key={optionIdx} className={styles.option}>
                                                <p>{option.name}</p>
                                                <p>{option.quantity}개</p>
                                            </div>
                                        ))}
                                        </div>
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
