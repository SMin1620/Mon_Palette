import React, { useState } from "react";
import "./Change.css"; // 스타일 파일 임포트

const ChangeNickname = () => {
	const [nickname, setNickname] = useState("");
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
						onChange={(e) => setNickname(e.target.value)}
						placeholder="닉네임을 입력하세요"
					/>{" "}
					<button class="change_duplication-button">중복확인</button>
				</div>
			</div>
			<br />
			<div className="change_button-container">
				<button>변경하기</button>
			</div>
		</div>
	);
};

export default ChangeNickname;
