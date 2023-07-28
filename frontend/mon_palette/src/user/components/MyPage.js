import React, { useState, useEffect } from "react";
import "./ChangeInfo.css"; // 스타일 파일 임포트
import axios from "axios";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [feedcnt, setFeedCnt] = useState("");
	const [follower, setFollower] = useState("");
	const [following, setFollowing] = useState("");
	const [isinfluence, setIsInfluence] = useState("");
	const Authorization = useRecoilValue(loginState);
	const Navigate = useNavigate();
	const getmapping = () => {
		// axios
		// 	.get("http://192.168.30.130:8080/api/user/mypage", {
		// 		headers: { Authorization: Authorization },
		// 	})
		// 	.then((response) => {
		// 		console.log(response.data);
		// 		if (response.data !== null) {
		// 			setBackground(response.data.data.background);
		// 			setProfile(response.data.data.profile);
		// 			setNickname(response.data.data.nickname);
		// 			setPersonalcolor(response.data.data.personalcolor);
		// 			setFeedCnt(response.data.data.feedcnt);
		// 			setFollower(response.data.data.follower);
		// 			setFollowing(response.data.data.following);
		// 			setIsInfluence(response.data.data.isinfluence);
		// 		}
		// 	});
		setBackground("");
		setProfile("");
		setNickname("은정이");
		setPersonalcolor("여름쿨톤");
		setFeedCnt(0);
		setFollower(0);
		setFollowing(0);
		setIsInfluence("user");
	};
	useEffect(() => {
		getmapping();
	}, []); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

	return (
		<div className="mypage_container">
			<div className="mypage_background-container">
				<img
					src={background}
					alt="background"
					className="mypage_background-picture"
				/>
				<img src={profile} alt="profile" className="mypage_profile-picture" />
			</div>
			<div className="mypage_form-group">
				<div>
					<div className="mypage_group-left">
						<label className="mypage_label">{nickname}</label>
					</div>
					<div className="mypage_group-left">
						<div className="mypage_span">{personalcolor}</div>
					</div>
				</div>
				<div className="mypage_group-left">
					<div className="mypage_group-left">게시물</div>
					<div className="mypage_span">{feedcnt}</div>
				</div>
				<div className="mypage_group-left">
					<div className="mypage_group-left">팔로워</div>
					<div className="mypage_span">{follower}</div>
				</div>
				<div className="mypage_group-left">
					<div className="mypage_group-left">팔로잉</div>
					<div className="mypage_span">{following}</div>
				</div>
			</div>
			{isinfluence === "user" ? (
				<div>
					<Link to="/changenickname">
						<div className="mypage_group-left">
							<div className="mypage_group-left">주문목록</div>
						</div>
					</Link>
					<Link to="/changenickname">
						<div className="mypage_group-left">
							<div className="mypage_group-left">장바구니</div>
						</div>
					</Link>
					<Link to="/feedwrite">
						<div className="mypage_group-left">
							<div className="mypage_group-left">만들기</div>
						</div>
					</Link>
					<Link to="/changeinfo">
						<div className="mypage_group-left">
							<div className="mypage_group-left">정보수정</div>
						</div>
					</Link>
				</div>
			) : (
				<div>
					<div className="mypage_form-group">
						<Link to="/feedwrite">
							<div className="mypage_group-left">
								<div className="mypage_group-left">주문목록</div>
							</div>
						</Link>
						<Link to="/feedwrite">
							<div className="mypage_group-left">
								<div className="mypage_group-left">장바구니</div>
							</div>
						</Link>
					</div>
					<div className="mypage_form-group">
						<Link to="/feedwrite">
							<div className="mypage_group-left">
								<div className="mypage_group-left">상품판매</div>
							</div>
						</Link>
						<Link to="/feedwrite">
							<div className="mypage_group-left">
								<div className="mypage_group-left">만들기</div>
							</div>
						</Link>
						<Link to="/changeinfo">
							<div className="mypage_group-left">
								<div className="mypage_group-left">정보수정</div>
							</div>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChangeInfo;
