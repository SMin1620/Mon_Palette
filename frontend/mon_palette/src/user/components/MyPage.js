import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import "./ChangeInfo.css"; // 스타일 파일 임포트

const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [feedcnt, setFeedCnt] = useState("");
	const [follower, setFollower] = useState("");
	const [following, setFollowing] = useState("");

	useEffect(() => {
		// 초기 값을 설정할 로직을 이곳에 작성합니다.
		setBackground("/static/image.png");
		setProfile("/static/image.png");
		setNickname("은댕");
		setPersonalcolor("여 름 쿨 톤");
		setFeedCnt(5);
		setFollower(100000);
		setFollowing(100000);
	}, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

	return (
		<div className="container">
			<div className="background-container">
				<img src={background} alt="background" className="background-picture" />
			</div>
			<br />
			<div className="profile-container">
				<img src={profile} alt="profile" className="profile-picture" />
			</div>
			<br />
			<br />
			<br />
			<div className="form-group">
				<div className="group-left">
					<label htmlFor="nickname">닉네임</label>
					<span>{nickname}</span>
				</div>
			</div>
			<div className="form-group">
				<div className="group-left">
					<label htmlFor="personalcolor">퍼스널컬러</label>
					<span>{personalcolor}</span>
				</div>
				<ChevronRightOutlinedIcon className="arrow-icon" />
			</div>
		</div>
	);
};

export default ChangeInfo;
