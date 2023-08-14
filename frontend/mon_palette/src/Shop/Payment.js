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
    const [paymentMethod, setPaymentMethod] = useState("KAKAOPAY");  
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
            axios.post(
                `${process.env.REACT_APP_API}/api/order`,
                {
                    data: {
                        items: orderData.brands,
                    }
                },
                {
                    headers: { Authorization: Authorization }
                }
            )
            .then(orderResponse => {
                const paymentData = orderResponse.data;
                console.log(paymentData)
        
                return PortOne.requestPayment({
                    // ...paymentData,
                    paymentId: `payments_${Date.now()}`,
                    storeId: 'store-179baf9b-4048-4f05-90b7-ec5d44e298d4',
                    channelKey: "channel-key-cdbcf2cf-3157-494d-b499-f8f1dd97dd2e",
                    orderName: paymentData.name,
                    totalAmount: paymentData.totalPrice,
                    currency: 'KRW',
                    pgProvider: paymentMethod === "KAKAOPAY",
                    payMethod: "EASY_PAY",
                    windowType: {
                        "pc": "IFRAME",
                    },
                    redirectUrl: "http://192.168.30.220:3000/home",
                });
            })
            .then(paymentResponse => {
                if (paymentResponse.code !== null) {
                    return alert(paymentResponse.message);
                }
        
                return axios.post(
                    `${process.env.REACT_APP_API}/payments/complete`,
                    {
                        body: {
                            txId: paymentResponse.txId,
                            paymentId: paymentResponse.paymentId,
                        },
                    },
                    {
                        headers: { Authorization: Authorization }
                    }
                );
            })
            .then(validationResult => {
                if (validationResult.data === true) {
                    navigate('/paymentsucceed');
                } else {
                    navigate('/paymentfailed');
                }
            })
            .catch(err => {
                console.log(err);
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
                    <p className={styles.deliveryinfo}>배송지 정보</p>
                    <div className={styles.deliveryinfochange} onClick={() => navigate('/deliveryList')}>변경</div>
                </div>
                <div className={styles.deliveryinfocontainer}>
                    <div>
                        <div>{mainAddress ? mainAddress.receiver : ""}</div>
                        <div>{mainAddress ? mainAddress.phone : ""}</div>
                    </div>
                    <div>
                    <div>{mainAddress ? mainAddress.zipcode : ""}</div>
                    <div>{mainAddress ? mainAddress.address : "주소가 설정되지 않았습니다."}</div>
                    </div>
                </div>
            </div>

            <div className={styles["paymethod_container"]}>
                <div>결제 방법</div>
                <div className={styles.radioboxcontainer}>
                <label>
                    <input
                        type="radio"
                        value="KAKAOPAY"
                        checked={paymentMethod === "KAKAOPAY"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    카카오 페이
                </label>
                {/* <label>
                    <input
                        type="radio"
                        value="NAVERPAY"
                        checked={paymentMethod === "NAVERPAY"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    네이버 페이
                </label> */}
                </div>
            </div>

            <div className={styles["price_container"]}>
                <div className={styles.priceinfo}>결제 금액</div>
                <div className={styles.price}>
                    <div>총 결제금액</div>
                    <div>{totalPrice}원</div>
                </div>
            </div>
            <div className={styles.purchase}>
                <div onClick={openPaymentWindow}>구매하기({totalPrice}원)</div>
            </div>
        </div>
    );
};

export default Payment;
