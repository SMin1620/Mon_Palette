import React, { useState, useEffect } from "react";
import "./DeliveryList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "src/user/components/Atom/loginState";

function DeliveryList() {
	const token = useRecoilValue(loginState);
	const navigate = useNavigate();
	const [address, setAddress] = useState([]);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		handleGetAddress();
		console.log("실행");
	}, []);

	useEffect(() => {
		if (update === true) {
			handleGetAddress();
		}
		setUpdate(false);
	}, [update]);

	const handleSetBaseAddress = (id) => {
		console.log(id);
		// 이 id 값으로 axios 요청 보내서 기본배송지 설정
	};

	// 배송지 조회
	const handleGetAddress = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/address`, {
				headers: { Authorization: token },
			})
			.then((response) => {
				setAddress(response.data.data);
				setUpdate(true);
			});
	};

	// 배송지 수정
	const handleEditAddress = (id, delivery) => {
		navigate(`/delivery/edit/${id}`, {
			state: { deliveryInfo: delivery },
		});
	};

	// 배송지 삭제
	const handleDeleteAddress = (id) => {
		axios
			.delete(`${process.env.REACT_APP_API}/api/address/${id}`, {
				headers: { Authorization: token },
			})
			.then(() => {
				// setUpdate(true)
			});
	};

	return (
		<div className="deliveryList">
			<div className="deliveryList_top_baseList">
				{address.map((delivery, index) => (
					<div className="deliveryList_top_baseList_container" key={index}>
						<div className="deliveryList_top_baseList_user_info">
							<div>
								<span>{delivery.receiver}</span>
								<span> | </span>
								<span>{delivery.phone.slice(0, 3)}</span>
								<span>-</span>
								<span>{delivery.phone.slice(3, 7)}</span>
								<span>-</span>
								<span>{delivery.phone.slice(7)}</span>
							</div>
							{delivery.isMain === 1 ? (
								<div className="deliveryList_top_baseList_baseAddress">
									기본배송지
								</div>
							) : null}
						</div>

						<div className="deliveryList_top_baseList_address_info">
							<span>({delivery.address})</span>
							<p>{delivery.zipcode}</p>
						</div>

						{delivery.isMain === 1 ? (
							<div className="deliveryList_top_baseList_button">
								<button>수정</button>
								<button>삭제</button>
							</div>
						) : (
							<div className="deliveryList_top_baseList_button">
								<button
									onClick={() => handleEditAddress(delivery.id, delivery)}
								>
									수정
								</button>
								<button onClick={() => handleDeleteAddress(delivery.id)}>
									삭제
								</button>
								<button onClick={() => handleSetBaseAddress(delivery.id)}>
									기본 배송지로 설정
								</button>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="delivery_bottom_add_address">
				<button onClick={() => navigate("/deliveryregist")}>+</button>
			</div>
		</div>
	);
}

export default DeliveryList;
