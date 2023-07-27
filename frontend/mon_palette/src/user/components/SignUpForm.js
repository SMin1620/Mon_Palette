import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css"; // 스타일 파일 임포트

const SignUpForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [name, setName] = useState("");
	const [nickname, setNickname] = useState("");
	const [birth, setBirth] = useState("");
	const [phone, setPhone] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [gender, setGender] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [duplicationEmail, setDuplicationEmail] = useState(false);
	const [duplicationNickname, setDuplicationNickname] = useState(false);
	const Navigate = useNavigate();

	const handleSignUp = () => {
		//while (!duplicationEmail) {}
		// while (!duplicationNickname) {
		// }
		axios
			.post("http://192.168.30.130:8080/api/user/signup", {
				email: email,
				password: password,
				name: name,
				birth: birth,
				phone: phone,
				gender: gender,
				nickname: nickname,
			})
			.then((response) => {
				if (response.data.check === true) {
					Navigate("/");
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const possibleEmail = () => {
		axios
			.get(`http://192.168.30.130:8080/api/user/idcheck/${email}`)
			.then((response) => {
				if (response.data.check === false) {
					setDuplicationEmail(false);
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const possibleNickname = () => {
		axios
			.get(`http://192.168.30.130:8080/api/user/nicknamecheck/${nickname}`)
			.then((response) => {
				if (response.data.check === false) {
					setDuplicationNickname(false);
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

	const handleChange = (e) => {
		const value = e.target.value;
		// 생년월일 정규표현식에 맞는지 확인
		if (/^\d{4}(-|\/)?\d{2}(-|\/)?\d{2}$/.test(value)) {
			setBirth(value);
		}
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
						onChange={(e) => setEmail(e.target.value)}
						onBlur={validateEmail} // 이메일 칸을 벗어날 때 유효성 검사 실행
						placeholder="이메일 주소를 입력하세요"
					/>{" "}
					<button class="signUpForm_duplication-button" onclick={possibleEmail}>
						중복확인
					</button>
				</div>
				{!isEmailValid && email.trim() !== "" && (
					<p className="signUpForm_error-message">
						유효한 이메일 주소를 입력하세요.
					</p>
				)}
				{!duplicationEmail && email.trim() !== "" && (
					<p className="signUpForm_error-message">이미 가입된이메일입니다</p>
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
				<input
					className="signUpForm_input"
					type="text"
					id="phone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
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
					onBlur={handleChange}
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
						onChange={(e) => setNickname(e.target.value)}
						placeholder="닉네임을 입력하세요"
					/>
					<button
						class="signUpForm_duplication-button"
						onclick={possibleNickname}
					>
						중복확인
					</button>
				</div>
				{!duplicationNickname && email.trim() !== "" && (
					<p className="signUpForm_error-message">이미 존재하는 닉네임입니다</p>
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
		</div>
	);
};

export default SignUpForm;
