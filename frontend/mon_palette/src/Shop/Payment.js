import React, { useState, useEffect } from "react";
import styles from "./Payment.module.css";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import { loginState } from "../user/components/Atom/loginState";
import * as PortOne from "@portone/browser-sdk/v2";

const info = {
	id: 1,
	userName: "정수완",
	phone: "01026595557",
	addressNumber: 12345,
	address: "부산 서구 초장동 43-6",
	addressDetail: "신화헤라 502호",
	isMain: 1,
};

const Payment = () => {
	const [userInfo, setUserInfo] = useState([]);
	const navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const [paymentMethod, setPaymentMethod] = useState("KAKAOPAY");
	const mainAddress = userInfo.find((address) => address.isMain === 1);
	const [totalPrice, setTotalPrice] = useState(0);
	const location = useLocation();
	const checkedItems = location.state.checkedItem;
	const selectedItems = location.state.selectedItems;
	function getAggregatedList(data) {
		const result = [];

		const isFromCheckedItems =
			data[0] && data[0].itemOptionDtoList !== undefined;

		const groupedByName = data.reduce((acc, item) => {
			if (!acc[item.name]) {
				acc[item.name] = [];
			}
			acc[item.name].push(item);
			return acc;
		}, {});

		let totalSumPrice = 0;

		for (const name in groupedByName) {
			const items = groupedByName[name];

			const aggregatedOptions = items.reduce((acc, item) => {
				const optionsSource = isFromCheckedItems
					? item.itemOptionDtoList
					: item.options;
				optionsSource.forEach((option) => {
					const existingOption = acc.find(
						(o) => o.itemOptionName === option.itemOptionName
					);
					if (existingOption) {
						existingOption.itemOptionCount += option.itemOptionCount;
					} else {
						acc.push({ ...option });
					}
				});
				return acc;
			}, []);
			if (checkedItems) {
				const itemSumPrice = items.reduce(
					(sum, item) => sum + item.sumPrice,
					0
				);
				totalSumPrice += itemSumPrice;

				result.push({
					name: name,
					price: items[0].price,
					options: aggregatedOptions,
					sumPrice: itemSumPrice,
					thumbnail: items[0].thumbnail,
				});
			} else {
				const itemSumPrice = items.reduce(
					(sum, item) =>
						(sum + item.price) * (1 - item.discount / 100) + item.deliveryFee,
					0
				);
				totalSumPrice += itemSumPrice;
				result.push({
					name: name,
					price: items[0].price,
					options: aggregatedOptions,
					sumPrice: itemSumPrice,
					thumbnail: items[0].thumbnail,
					deliveryFee: items[0].deliveryFee,
					discount: items[0].discount,
				});
			}
		}

		return {
			items: result,
			totalSumPrice: totalSumPrice,
		};
	}

	const orderData = getAggregatedList(checkedItems || selectedItems);
	console.log(orderData);
	// const [id, setId] = useState(null);

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

	// const orderData =  [
	//     {
	//         itemId: 1,
	//         itemOptions: [
	//             {
	//                 itemOptionId: 1,
	//                 itemOptionCount: 1
	//             },
	// {
	//     itemOptionId: 56,
	//     itemOptionCount: 3
	// }
	//     ]
	// },
	// {
	//     itemId : 2,
	//     itemOptions: [
	//         {
	//         itemOptionId: 1,
	//         itemOptionCount: 1
	//     }
	//     ]
	// }
	//         ];

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

		axios
			.post(
				`${process.env.REACT_APP_API}/api/order`,
				{
					items: orderData,
					address: setAddress,
					requirement: "빨리배송해주세요",
					paymentMethod: "KAKAOPAY",
					orderStatus: "ORDER",
				},
				{
					headers: { Authorization: Authorization },
				}
			)
			.then((orderResponse) => {
				console.log(orderResponse);
				const paymentData = orderResponse.data.data;
				const orderId = paymentData.orderId;
				console.log(paymentData);
				setTotalPrice(paymentData.totalPrice);

				return PortOne.requestPayment({
					paymentId: `payments_${Date.now()}`,
					storeId: "store-179baf9b-4048-4f05-90b7-ec5d44e298d4",
					channelKey: "channel-key-cdbcf2cf-3157-494d-b499-f8f1dd97dd2e",
					orderName: paymentData.name,
					totalAmount: paymentData.totalPrice,
					currency: "KRW",
					pgProvider: "KAKAOPAY",
					payMethod: "EASY_PAY",
					windowType: {
						pc: "IFRAME",
					},
					redirectUrl: `${process.env.REACT_APP_API}/payments`,
				}).then((paymentResponse) => {
					console.log(paymentResponse);
					return { orderId, paymentResponse };
				});
			})
			// .then(({ orderId, paymentResponse }) => {
			//     return axios.post(
			//         `${process.env.REACT_APP_API}/payment/complete`,
			//         {
			//                 txId: paymentResponse.txId,
			//                 paymentId: paymentResponse.paymentId,
			//         },
			//         {
			//             headers: { Authorization: Authorization }
			//         }
			//     );
			// })
			.then((validationResult) => {
				console.log(validationResult);
				if (validationResult.orderId) {
					navigate("/paymentsucceed");
				} else {
					navigate("/paymentfailed");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API}/api/address`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				setUserInfo(response.data.data);
				// console.log(response.data)
			})
			.catch((error) => {
				console.error("Error fetching user info:", error);
			});
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles["item_container"]}>
				<div className={styles.title}>주문상품</div>
				<div>
					{orderData.items.map((item, itemIdx) => (
						<div key={itemIdx} className={styles.brandbycontainer}>
							<div className={styles.product}>
								<img
									className={styles.img}
									src={item.thumbnail ? item.thumbnail : null}
									alt={`Item ${itemIdx + 1}`}
								/>
								<div className={styles["product-info"]}>
									<h4 className={styles.productname}>{item.name}</h4>
									<div>가격: {item.price}</div>
									<div>할인율: {item.discount}%</div>
									<div>배송비: {item.deliveryFee}</div>
								</div>
							</div>
							<div className={styles.options}>
								option:
								<div className={styles["option_container"]}>
									{item.options.map((option, optionIdx) => (
										<div key={optionIdx} className={styles.option}>
											<p>{option.itemOptionName}</p>
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
					<div
						className={styles.deliveryinfochange}
						onClick={() => navigate("/deliveryList")}
					>
						변경
					</div>
				</div>
				<div className={styles.deliveryinfocontainer}>
					<div>
						<div>{mainAddress ? mainAddress.receiver : ""}</div>
						<div>{mainAddress ? mainAddress.phone : ""}</div>
					</div>
					<div>
						<div>{mainAddress ? mainAddress.zipcode : ""}</div>
						<div>
							{mainAddress
								? mainAddress.address
								: "주소가 설정되지 않았습니다."}
						</div>
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
					<div>
						{orderData.totalSumPrice ? orderData.totalSumPrice : 10000}원
					</div>
				</div>
			</div>
			<div className={styles.purchase}>
				<div onClick={openPaymentWindow}>
					구매하기(
					{orderData.totalSumPrice ? orderData.totalSumPrice : 10000}
					원)
				</div>
			</div>
		</div>
	);
};

export default Payment;
