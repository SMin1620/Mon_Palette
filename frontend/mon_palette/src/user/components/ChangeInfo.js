import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import "./ChangeInfo.css"; // 스타일 파일 임포트

const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		// 초기 값을 설정할 로직을 이곳에 작성합니다.
		setBackground("/static/image.png");
		setProfile("/static/image.png");
		setNickname("은댕");
		setPersonalcolor("여 름 쿨 톤");
		setPassword("비 밀 번 호");
		setPhone("010-1234-5678");
		setAddress("우리집");
	}, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

	return (
		<div className="changeInfo_container">
			<div className="changeInfo_background-container">
				<img
					src={background}
					alt="background"
					className="changeInfo_background-picture"
				/>
			</div>
			<br />
			<div className="changeInfo_profile-container">
				<img
					src={profile}
					alt="profile"
					className="changeInfo_profile-picture"
				/>
			</div>
			<br />
			<br />
			<br />
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="nickname">
						닉네임
					</label>
					<span>{nickname}</span>
				</div>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="personalcolor">
						퍼스널컬러
					</label>
					<span>{personalcolor}</span>
				</div>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="password">
						비밀번호
					</label>
					<span>{password}</span>
				</div>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="phone">
						휴대폰번호
					</label>
					<span>{phone}</span>
				</div>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="address">
						주소
					</label>
					<span>{address}</span>
				</div>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
			<div className="changeInfo_form-group">
				<label className="changeInfo_label">회 원 탈 퇴</label>
				<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
			</div>
		</div>
	);
};

export default ChangeInfo;
