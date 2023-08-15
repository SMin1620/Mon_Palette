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
    const mainAddress = userInfo.find(address => address.isMain === 0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [id, setId] = useState(null);
    
    // const {IMP} = window; 
    // IMP.init("imp66584242"); 
    // const orderData = {
        //     brands: [
            //         {
                //             name: "BrandA",
                //             products: [
                    //                 {
                        //                     name: "ProductA1",
                        //                     price: 100,
                        //                     options: [
                            //                         { name: "OptionA1", quantity: 2 },
                            //                         { name: "OptionA2", quantity: 3 }
                            //                     ]
                            //                 },
                            //                 {
                                //                     name: "ProductA2",
                                //                     price: 200,
                                //                     options: [
                                    //                         { name: "OptionA3", quantity: 1 }
                                    //                     ]
                                    //                 }
                                    //             ]
                                    //         },
                                    //         {
                                        //             name: "BrandB",
                                        //             products: [
                                            //                 {
                                                //                     name: "ProductB1",
                                                //                     price: 50,
                                                //                     options: [
    //                         { name: "OptionB1", quantity: 5 }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // };
    
    const orderData =  [
        {
            itemId: 58,
            itemOptions: [
                {
                    itemOptionId: 55,
                    itemOptionCount: 2
                },
                {
                    itemOptionId: 56,
                    itemOptionCount: 3
                }
            ]
        },
                ];
      
      
                
                
                
        

    // const calculateTotalPrice = () => {
    //     let total = 0;

    //     orderData.brands.forEach(brand => {
    //         brand.products.forEach(product => {
    //             product.options.forEach(option => {
    //                 total += product.price * option.quantity;
    //             });
    //         });
    //     });

    //     return total;
    // };

    // const totalPrice = calculateTotalPrice();


    function openPaymentWindow() {
        let setAddress = {
            address: mainAddress.address,
            zipcode: mainAddress.zipcode,
            phone: mainAddress.phone,
            receiver: mainAddress.receiver,
        };

        axios.post(
            `${process.env.REACT_APP_API}/api/order`,
            {
                items: orderData,
                address: setAddress,
                requirement: "빨리배송해주세요",
                paymentMethod: "KAKAOPAY",
                orderStatus: "ORDER"
            },
            {
                headers: { Authorization: Authorization }
            }
        )
        .then(orderResponse => {
            const paymentData = orderResponse.data.data;
            const orderId = paymentData.orderId;
            console.log(paymentData);
            setTotalPrice(paymentData.totalPrice);

            return PortOne.requestPayment({
                paymentId: `payments_${Date.now()}`,
                storeId: 'store-179baf9b-4048-4f05-90b7-ec5d44e298d4',
                channelKey: "channel-key-cdbcf2cf-3157-494d-b499-f8f1dd97dd2e",
                orderName: paymentData.name,
                totalAmount: paymentData.totalPrice,
                currency: 'KRW',
                pgProvider: "KAKAOPAY",
                payMethod: "EASY_PAY",
                windowType: {
                    "pc": "IFRAME",
                },
                redirectUrl: "http://192.168.30.220:8080/home"
            }).then(paymentResponse => {
                return { orderId, paymentResponse };
            });
        })
        // .then(({ orderId, paymentResponse }) => {
        //     return axios.post(
        //         `${process.env.REACT_APP_API}/payment/${orderId}`,
        //         {
        //             data: {
        //                 txId: paymentResponse.txId,
        //                 paymentId: paymentResponse.paymentId,
        //             }
        //         },
        //         {
        //             headers: { Authorization: Authorization }
        //         }
        //     );
        // })
        .then(validationResult => {
            console.log(validationResult);
            if (validationResult.orderId) {
                navigate('/paymentsucceed');
            } else {
                navigate('/paymentfailed');
            }
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        axios.get(
            `${process.env.REACT_APP_API}/api/address`,
            { headers: { Authorization: Authorization } }
        )
        .then(response => {
            setUserInfo(response.data.data);
            // console.log(response.data)
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
                {orderData.map((item, itemIdx) => (
                    <div key={itemIdx} className={styles.brandbycontainer}>
                        <div className={styles.product}>
                            <img className={styles.img} src={item.feedImages ? item.feedImages[0].imagePath : null} alt={`Item ${itemIdx + 1}`} />
                            <div className={styles["product-info"]}> 
                                <h4 className={styles.productname}>{`Item ${item.itemId}`}</h4>
                                <div>가격: {/* 제품 가격은 실제 데이터에서 가져와야 합니다. */}</div>
                            </div>
                        </div>
                        <div className={styles.options}>
                            option: 
                            <div className={styles["option_container"]}>
                                {item.itemOptions.map((option, optionIdx) => (
                                    <div key={optionIdx} className={styles.option}>
                                        <p>{`Option ${option.itemOptionId}`}</p>
                                        <p>{option.itemOptionCount}개</p>
                                    </div>
                                ))}
                            </div>
                        </div>
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
