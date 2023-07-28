import React, { useState } from "react";
import "./Change.css"; // 스타일 파일 임포트
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
const ChangeNickname = () => {
	const [phone, setPhone] = useState("");
	const [duplicationPhone, setDuplicationPhone] = useState(true);
	const [phoneState, setPhoneState] = useState(false);
	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const possiblePhone = (e) => {
		axios
			.get(`http://192.168.30.130:8080/api/user/phonecheck?phone=${phone}`)
			.then((response) => {
				if (response.data && response.data.data.check === false) {
					setDuplicationPhone(false);
					setPhoneState(false);
				} else {
					setDuplicationPhone(true);
					setPhoneState(true);
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const changePhone = (e) => {
		setPhone(e.target.value);
		setPhoneState(false);
	};

	const change = () => {
		if (duplicationPhone && phoneState) {
			axios
				.put(
					"http://192.168.30.130:8080/api/user/phone",
					{ phone: phone },
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
		} else {
			setIsModalOpen(true);
		}
	};
	return (
		<div className="change_container">
			<h2>새로운 연락처를</h2>
			<h2>입력해주세요</h2>
			<br />
			<br />
			<br />
			<br />
			<div className="change_form-group">
				<label className="change_label" htmlFor="phone">
					연락처
				</label>
				<br />
				<div className="change_input-with-button">
					<input
						className="change_input"
						type="number"
						id="phone"
						maxlength={11}
						value={phone}
						onChange={changePhone}
					/>
					<button onClick={possiblePhone} class="change_duplication-button">
						중복확인
					</button>
				</div>
				{!duplicationPhone && (
					<p className="signUpForm_error-message">이미 가입된 연락처입니다</p>
				)}
				{duplicationPhone && phoneState && (
					<p className="signUpForm_error-message">사용 가능한 연락처입니다</p>
				)}
			</div>

			<br />
			<div className="change_button-container">
				<button onClick={change}>변경하기</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h3>연락처 중복체크 해주세요 'v'</h3>
			</Modal>
		</div>
	);
};

export default ChangeNickname;
