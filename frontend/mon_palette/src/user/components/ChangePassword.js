import React, { useState } from "react";
import "./Change.css"; // 스타일 파일 임포트
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";

const ChangeNickname = () => {
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const change = () => {
		axios
			.put(
				"http://192.168.30.130:8080/api/user/password",
				{ password: password },
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
	const validatePassword = () => {
		const passwordRegex =
			/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
		setPasswordError(!passwordRegex.test(password));
	};

	return (
		<div className="change_container">
			<h2>새로운 비밀번호를</h2>
			<h2>입력해주세요</h2>
			<br />
			<br />
			<br />
			<br />
			<div className="change_form-group">
				<label className="change_label" htmlFor="password">
					비밀번호
				</label>
				<input
					className="change_input"
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onBlur={validatePassword} // 비밀번호 칸을 벗어날 때 비밀번호 검사 실행
					placeholder="6-20자 영문 대소문자, 숫자, 특수문자 조합"
				/>
				{passwordError && (
					<p className="change_error-message">
						6-20자 영문 대소문자, 숫자, 특수문자 조합으로 입력해주세요.
					</p>
				)}
			</div>
			<div className="change_button-container">
				<button onClick={change}>변경하기</button>
			</div>
		</div>
	);
};

export default ChangeNickname;
