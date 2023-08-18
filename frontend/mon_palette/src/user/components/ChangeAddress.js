import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom/loginState";
import { useNavigate } from "react-router-dom";
import "./Change.css"; // 스타일 파일 임포트
import DaumPostcode from "react-daum-postcode";
const ChangeAddress = () => {
	const [address, setAddress] = useState("");
	const [openPostcode, setOpenPostcode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	useEffect(() => {
		if (Authorization) {
		}
	}, [address]);
	const change = () => {
		axios
			.put(
				`${process.env.REACT_APP_API}/api/user/address`,
				{ address: address },
				{ headers: { Authorization: Authorization } }
			)
			.then((response) => {
				console.log(response);
				if (response.data !== null) {
					Navigate("/changeinfo");
				} else {
				}
			})
			.catch((err) => {
				console.error("error", err);
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
			console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `);
			setAddress(data.address);

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
		<div className="change_container">
			<h2>새로운 주소를</h2>
			<h2>입력해주세요</h2>
			<br />
			<br />
			<br />
			<br />
			<div className="change_form-group">
				<div className="change_search_button">
					<input
						className="change_input"
						type="text"
						id="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder="주소를 입력하세요"
					/>
					<button
						className="change_address_search_button"
						onClick={handle.clickButton}
					>
						찾기
					</button>
				</div>
			</div>
			<br />
			<div className="change_button-container">
				<button onClick={change}>변경하기</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<div>
					{
						<DaumPostcode
							onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
							autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
							defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
						/>
					}
				</div>
			</Modal>
		</div>
	);
};

export default ChangeAddress;
