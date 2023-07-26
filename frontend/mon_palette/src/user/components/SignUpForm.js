import React, { useState } from "react";
import "./SignUpForm.css"; // 스타일 파일 임포트

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [gender, setGender] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);

	const handleSignUp = () => {
		console.log("이메일:", email);
		console.log("비밀번호:", password);
		console.log("이름:", name);
		console.log("닉네임:", nickname);
		console.log("성별:", gender);
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

	return (
		<div className="container">
			<div className="form-group">
				<label htmlFor="email">이메일</label>
				<div className="input-with-button">
					<input
						type="text"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={validateEmail} // 이메일 칸을 벗어날 때 유효성 검사 실행
						placeholder="이메일 주소를 입력하세요"
					/>{" "}
					<button class="duplication-button">중복확인</button>
				</div>
				{!isEmailValid && email.trim() !== "" && (
					<p className="error-message">유효한 이메일 주소를 입력하세요.</p>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="password">비밀번호</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={validatePassword} // 비밀번호 칸을 벗어날 때 비밀번호 검사 실행
					placeholder="6-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{passwordError && (
					<p className="error-message">
						6-20자 영문 대소문자, 숫자, 특수문자 조합으로 입력해주세요.
					</p>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="passwordConfirm">비밀번호 확인</label>
				<input
					type="password"
					id="passwordConfirm"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
					onBlur={validatePasswordConfirm}
					placeholder="6-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{passwordConfirmError && (
					<p className="error-message">
						비밀번호와 비밀번호 확인이 일치하지 않습니다.
					</p>
				)}
			</div>
			<div className="form-group">
				<label htmlFor="name">이름</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="이름을 입력하세요"
				/>
			</div>
			<div className="form-group">
				<label htmlFor="nickname">닉네임</label>
				<div className="input-with-button">
					<input
						type="text"
						id="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						placeholder="닉네임을 입력하세요"
					/>
					<button class="duplication-button">중복확인</button>
				</div>
			</div>
			<div className="form-group">
				<label htmlFor="gender">성별</label>
			</div>
			<div className="gender-button-container">
				<button
					className={gender === "female" ? "active" : ""}
					onClick={() => setGender("female")}
				>
					여성
				</button>
				<span class="button-gap" />
				<button
					className={gender === "male" ? "active" : ""}
					onClick={() => setGender("male")}
				>
					남성
				</button>
			</div>
			<div className="button-container">
				<button onClick={handleSignUp}>Sign Up</button>
			</div>
		</div>
	);
};

export default SignUpForm;
