import React, { useState } from "react";
import "./Change.css"; // 스타일 파일 임포트

const ChangeNickname = () => {
	const [phone, setPhone] = useState("");
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
				<input
					className="change_input"
					type="number"
					id="phone"
					maxlength={11}
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<br />
			<div className="change_button-container">
				<button>변경하기</button>
			</div>
		</div>
	);
};

export default ChangeNickname;
