import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
import "./Change.css"; // 스타일 파일 임포트

const ChangeNickname = () => {
	const [address, setAddress] = useState("");
	const Navigate = useNavigate();
	const Authorization = useRecoilValue(loginState);
	const change = () => {
		axios
			.put(
				"http://192.168.30.130:8080/api/user/address",
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
	return (
		<div className="change_container">
			<h2>새로운 주소를</h2>
			<h2>입력해주세요</h2>
			<br />
			<br />
			<br />
			<br />
			<div className="change_form-group">
				<label className="change_label" htmlFor="nickname">
					주소
				</label>
				<br />
				<input
					className="change_input"
					type="text"
					id="address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="주소를 입력하세요"
				/>
			</div>
			<br />
			<div className="change_button-container">
				<button onClick={change}>변경하기</button>
			</div>
		</div>
	);
};

export default ChangeNickname;
