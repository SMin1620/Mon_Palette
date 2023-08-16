import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userId } from "./Atom/UserId";
import { loginState } from "./Atom/loginState";
import Modal from "../../Modal/Modal";
const LoginForm = () => {
	const [email, setUsername] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [passwordError, setPasswordError] = useState(false);
	const [password, setPassword] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [id, setId] = useRecoilState(userId);
	const [token, setToken] = useRecoilState(loginState);
	const Navigate = useNavigate();
	useEffect(() => {}, [isModalOpen]);
	const openModal = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleLogin = () => {
		if (isEmailValid && !passwordError) {
			axios
				.post(`${process.env.REACT_APP_API}/api/user/login`, {
					email: email,
					password: password,
				})
				.then((response) => {
					if (response.data.status === "success") {
						setToken(response.headers.authorization);
						setId(response.data.data.userId);
						Navigate(`/home`);
					} else {
						openModal();
					}
				})
				.catch((err) => {
					console.error("error", err);
				});
		} else {
			openModal();
		}
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

	return (
		<div className="loginForm_container">
			<div className="loginForm_form-group">
				<label className="loginForm_label" htmlFor="email">
					이메일
				</label>
				<input
					className="loginForm_input"
					type="text"
					id="email"
					value={email}
					onChange={(e) => setUsername(e.target.value)}
					onBlur={validateEmail} // 이메일 칸을 벗어날 때 유효성 검사 실행
					placeholder="이메일 주소를 입력하세요"
				/>
			</div>
			{!isEmailValid && email.trim() !== "" && (
				<p className="signUpForm_error-message">
					유효한 이메일 주소를 입력하세요.
				</p>
			)}
			<br />
			<div className="loginForm_form-group">
				<label className="loginForm_label" htmlFor="password">
					비밀번호
				</label>
				<input
					className="loginForm_input"
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={validatePassword} // 비밀번호 칸을 벗어날 때 비밀번호 검사 실행
					placeholder="8-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
			</div>
			{passwordError && (
				<p className="signUpForm_error-message">
					6-20자 영문 대소문자, 숫자, 특수문자 조합으로 입력해주세요.
				</p>
			)}
			<br />
			<div className="loginForm_link-container">
				<p>비밀번호 재설정</p>
				<p>|</p>
				<Link to="/signupform">
					<p>회원가입</p>
				</Link>
			</div>
			<div className="loginForm_button-container">
				<button onClick={handleLogin}>Login</button>
			</div>

			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h3>ID와 비밀번호를 확인해주세요 ._.</h3>
			</Modal>
		</div>
	);
};

export default LoginForm;
