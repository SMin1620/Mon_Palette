import React, { useState } from "react";
import "./Change.css"; // 스타일 파일 임포트
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";

const ChangeNickname = () => {
	const [nickname, setNickname] = useState("");
	const [nicknameState, setNicknameState] = useState(false);
	const [duplicationNickname, setDuplicationNickname] = useState(true);
	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const possibleNickname = (e) => {
		axios
			.get(
				`http://192.168.30.130:8080/api/user/nicknamecheck?nickname=${nickname}`
			)
			.then((response) => {
				if (response.data && response.data.data.check === false) {
					setDuplicationNickname(false);
					setNicknameState(false);
				} else {
					setDuplicationNickname(true);
					setNicknameState(true);
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const changeNickname = (e) => {
		setNickname(e.target.value);
		setNicknameState(false);
	};

	const change = () => {
		if (duplicationNickname && !nicknameState) {
			setIsModalOpen(true);
		}
		if (nicknameState && duplicationNickname) {
			axios
				.put(
					"http://192.168.30.130:8080/api/user/nickname",
					{ nickname: nickname },
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
		}
	};
	return (
		<div className="change_container">
			<h2>새로운 닉네임을</h2>
			<h2>입력해주세요</h2>
			<br />
			<br />
			<br />
			<br />
			<div className="change_form-group">
				<label className="change_label" htmlFor="nickname">
					닉네임
				</label>
				<br />
				<div className="change_input-with-button">
					<input
						className="change_input"
						type="text"
						id="nickname"
						value={nickname}
						onChange={changeNickname}
						placeholder="닉네임을 입력하세요"
					/>
					<button onclick={possibleNickname} class="change_duplication-button">
						중복확인
					</button>
				</div>
				{!duplicationNickname && (
					<p className="signUpForm_error-message">이미 존재하는 닉네임입니다</p>
				)}
				{duplicationNickname && nicknameState && (
					<p className="signUpForm_error-message">사용 가능한 닉네임입니다</p>
				)}
			</div>
			<br />
			<div className="change_button-container">
				<button onclick={change}>변경하기</button>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h3>닉네임 중복체크 해주세요 'v'</h3>
			</Modal>
		</div>
	);
};

export default ChangeNickname;
