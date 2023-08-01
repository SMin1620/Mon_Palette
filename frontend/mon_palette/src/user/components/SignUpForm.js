//시간 남을때 연락처 생년월일 폼 맞추기

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import "./SignUpForm.css"; // 스타일 파일 임포트

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [emailState, setEmailState] = useState(false);
	const [duplicationEmail, setDuplicationEmail] = useState(true);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	const [nicknameState, setNicknameState] = useState(false);
	const [duplicationNickname, setDuplicationNickname] = useState(true);
	const [birth, setBirth] = useState("");
	const [phone, setPhone] = useState("");
	const [duplicationPhone, setDuplicationPhone] = useState(true);
	const [phoneState, setPhoneState] = useState(false);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [gender, setGender] = useState("");
	const [notduplication, setNotDuplication] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const Navigate = useNavigate();

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleSignUp = () => {
		if (duplicationEmail && !emailState) {
			setNotDuplication("이메일");
			setIsModalOpen(true);
		}
		if (duplicationNickname && !nicknameState) {
			setNotDuplication("닉네임");
			setIsModalOpen(true);
		}
		if (duplicationPhone && !phoneState) {
			setNotDuplication("연락처");
			setIsModalOpen(true);
		}
		if (
			emailState &&
			nicknameState &&
			phoneState &&
			duplicationEmail &&
			duplicationNickname &&
			duplicationPhone
		) {
			axios
				.post(`${process.env.REACT_APP_API}/api/user/signup`, {
					email: email,
					password: password,
					name: name,
					birth: birth,
					phone: phone,
					gender: gender,
					nickname: nickname,
				})
				.then((response) => {
					if (response.data.data.check === true) {
						Navigate("/");
					}
				})
				.catch((err) => {
					console.error("error", err);
				});
		}
	};

	const possibleEmail = (e) => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/idcheck?email=${email}`)
			.then((response) => {
				if (response.data && response.data.data.check === false) {
					setDuplicationEmail(false);
					setEmailState(false);
				} else {
					setDuplicationEmail(true);
					setEmailState(true);
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const possibleNickname = (e) => {
		axios
			.get(
				`${process.env.REACT_APP_API}/api/user/nicknamecheck?nickname=${nickname}`
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

	const possiblePhone = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/phonecheck?phone=${phone}`)
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

	const validateEmail = () => {
		if (email.trim() === "") {
			setIsEmailValid(true);
			return true;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(email);
		setIsEmailValid(isValid);
		return isValid;
	};

	const validatePassword = () => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
		setPasswordError(!passwordRegex.test(password));
	};

	const validatePasswordConfirm = () => {
		setPasswordConfirmError(password !== passwordConfirm);
	};

	const changeEmail = (e) => {
		setEmail(e.target.value);
		setEmailState(false);
	};

	const changePhone = (e) => {
		setPhone(e.target.value);
		setPhoneState(false);
	};

	const changeNickname = (e) => {
		setNickname(e.target.value);
		setNicknameState(false);
	};

	return (
		<div className="signUpForm_container">
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="email">
					이메일
				</label>
				<div className="signUpForm_input-with-button">
					<input
						className="signUpForm_input"
						type="text"
						id="email"
						value={email}
						onChange={changeEmail}
						onBlur={validateEmail} // 이메일 칸을 벗어날 때 유효성 검사 실행
						placeholder="이메일 주소를 입력하세요"
					/>
					<button
						class="signUpForm_duplication-button"
						onClick={(e) => possibleEmail(e)}
					>
						중복확인
					</button>
				</div>
				{!isEmailValid && email.trim() !== "" && (
					<p className="signUpForm_error-message">
						유효한 이메일 주소를 입력하세요.
					</p>
				)}
				{!duplicationEmail && (
					<p className="signUpForm_error-message">이미 가입된이메일입니다</p>
				)}
				{duplicationEmail && emailState && (
					<p className="signUpForm_error-message">사용 가능한 이메일입니다</p>
				)}
			</div>
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="password">
					비밀번호
				</label>
				<input
					className="signUpForm_input"
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={validatePassword} // 비밀번호 칸을 벗어날 때 비밀번호 검사 실행
					placeholder="6-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{passwordError && (
					<p className="signUpForm_error-message">
						6-20자 영문 대소문자, 숫자, 특수문자 조합으로 입력해주세요.
					</p>
				)}
			</div>
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="passwordConfirm">
					비밀번호 확인
				</label>
				<input
					className="signUpForm_input"
					type="password"
					id="passwordConfirm"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					onBlur={validatePasswordConfirm}
					placeholder="6-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{passwordConfirmError && (
					<p className="signUpForm_error-message">
						비밀번호와 비밀번호 확인이 일치하지 않습니다.
					</p>
				)}
			</div>
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="name">
					이름
				</label>
				<input
					className="signUpForm_input"
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="이름을 입력하세요"
				/>
			</div>
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="phone">
					연락처
				</label>
				<div className="signUpForm_input-with-button">
					<input
						className="signUpForm_input"
						type="text"
						id="phone"
						value={phone}
						placeholder="00*-000*-0000"
						onChange={changePhone}
					/>
					<button
						class="signUpForm_duplication-button"
						onClick={(e) => possiblePhone(e)}
					>
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

			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="birth">
					생년월일
				</label>
				<input
					className="signUpForm_input"
					type="text"
					id="birth"
					value={birth}
					placeholder="YYYY-MM-DD"
					onChange={(e) => setBirth(e.target.value)}
				/>
			</div>
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="nickname">
					닉네임
				</label>
				<div className="signUpForm_input-with-button">
					<input
						className="signUpForm_input"
						type="text"
						id="nickname"
						value={nickname}
						onChange={changeNickname}
						placeholder="닉네임을 입력하세요"
					/>
					<button
						class="signUpForm_duplication-button"
						onClick={(e) => possibleNickname(e)}
					>
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
			<div className="signUpForm_form-group">
				<label className="signUpForm_label" htmlFor="gender">
					성별
				</label>
			</div>
			<div className="signUpForm_gender-button-container">
				<button
					className={gender === "female" ? "active" : ""}
					onClick={() => setGender("female")}
				>
					여성
				</button>
				<span class="signUpForm_button-gap" />
				<button
					className={gender === "male" ? "active" : ""}
					onClick={() => setGender("male")}
				>
					남성
				</button>
			</div>
			<div className="signUpForm_button-container">
				<button onClick={handleSignUp}>Sign Up</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={closeModal}
				children={notduplication}
			>
				<h3>{notduplication} 중복체크 해주세요 'v'</h3>
			</Modal>
		</div>
	);
};

export default SignUpForm;
