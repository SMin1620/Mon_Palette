import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "src/user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import "./DeliveryRegist.css";
const DeliveryRegist = () => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [postCode, setPostCode] = useState("");
	const [address, setAddress] = useState("");
	const [addressDetail, setAddressDetail] = useState("");
	const [deliverRequest, setDeliverRequest] = useState("");
	const [deliverRequestSelect, setDeliverRequestSelect] = useState("직접입력");
	const [checkedItem, setCheckedItem] = useState(false);
	const [deliverRequestList, setDeliverRequestList] = useState([
		"직접입력",
		"빠른 배송 부탁드립니다.",
		"배송 전, 연락주세요.",
		"부재 시, 휴대폰으로 연락주세요.",
		"부재 시, 경비실에 맡겨주세요.",
		"경비실이 없습니다. 배송 전, 연락주세요.",
		"선택 안함",
	]);
	const [openPostcode, setOpenPostcode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const id = useRecoilValue(userId);

	const change = () => {
		if (deliverRequestSelect !== "직접입력") {
			setDeliverRequest(deliverRequestSelect);
		}
		axios
			.post(
				`${process.env.REACT_APP_API}/api/address`,
				{
					userId: id,
					receiver: name,
					address: address + addressDetail,
					zipcode: postCode,
					phone: phone,
					isMain: checkedItem ? 1 : 0,
				},
				{
					headers: { Authorization: Authorization },
				}
			)
			.then((response) => {
				console.log(response);

				Navigate(`/deliverylist`);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handle = {
		// 버튼 클릭 이벤트
		clickButton: () => {
			setOpenPostcode((current) => !current);
			setIsModalOpen(true);
		},

		// 주소 선택 이벤트
		selectAddress: (data) => {
			setAddress(data.address);
			setPostCode(data.zonecode);

			setOpenPostcode(false);
			setIsModalOpen(false);
		},
	};

	const Modal = ({ isOpen, onClose, children }) => {
		if (!isOpen) return null;

		return (
			<div className="modal-container">
				<div className="modal-content">{children}</div>
				<div className="modal-button-container">
					<button className="withdraw_modal-button" onClick={closeModal}>
						취소
					</button>
				</div>
			</div>
		);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="deliveryregist_container">
			<br />
			<div className="deliveryregist_form_group">
				<label className="deliveryregist_label" htmlFor="name">
					수령인 이름
				</label>
				<input
					className="deliveryregist_input"
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="수령인 이름을 입력하세요"
				/>
			</div>
			<br />
			<div className="deliveryregist_form_group">
				<label className="deliveryregist_label" htmlFor="phone">
					연락처
				</label>
				<input
					className="deliveryregist_input"
					type="text"
					id="phone"
					value={phone}
					placeholder="00*-000*-0000"
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<br />
			<div className="deliveryregist_form_group">
				<label className="deliveryregist_label" htmlFor="phone">
					배송지
				</label>
				<div className="deliveryregist_input_button">
					<input
						className="deliveryregist_input"
						type="text"
						id="postCode"
						value={postCode}
						placeholder="우편번호"
					/>
					<button
						className="change_address_search_button"
						onClick={handle.clickButton}
					>
						찾기
					</button>
				</div>
				<input
					className="deliveryregist_input"
					type="text"
					id="address"
					value={address}
					placeholder="주소"
				/>
			</div>
			<br />
			<div className="deliveryregist_form_group">
				<label className="deliveryregist_label" htmlFor="phone">
					상세주소
				</label>
				<input
					className="deliveryregist_input"
					type="text"
					id="addressdetail"
					value={addressDetail}
					onChange={(e) => {
						setAddressDetail(e.target.value);
					}}
					placeholder="상세주소"
				/>
			</div>
			<br />
			<div className="deliveryregist_form_group">
				<label className="deliveryregist_label" htmlFor="phone">
					배송 요청사항
				</label>
				<br />
				<select
					className="deliveryregist_select"
					onClick={(e) => {
						setDeliverRequestSelect(e.target.value);
					}}
				>
					{deliverRequestList.map((req, index) => (
						<option key={index} value={req}>
							{req}
						</option>
					))}
				</select>
				{deliverRequestSelect !== "직접입력" ? (
					<></>
				) : (
					<input
						className="deliveryregist_input"
						type="text"
						id="deliverRequest"
						value={deliverRequest}
						onChange={(e) => {
							setDeliverRequest(e.target.value);
						}}
					/>
				)}
			</div>
			<br />
			<div className="deliveryregist_checkbox_group">
				<input
					type="checkbox"
					className="deliveryregist_checkbox"
					id="check"
					onChange={(e) => {
						setCheckedItem(e.target.value);
					}}
				/>
				<div className="deliveryregist_checkbox_text">기본 배송지 등록</div>
			</div>
			<div className="deliveryregist_buttoncontainer">
				<button onClick={change}>등록하기</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div>
					<DaumPostcode
						onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
						autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
						defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
					/>
				</div>
			</Modal>
		</div>
	);
};

export default DeliveryRegist;
