import React, { useState, useEffect } from "react";
import "./UserPage.css"; // 스타일 파일 임포트
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom/loginState";
import { useNavigate } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const UserPage = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [feedcnt, setFeedCnt] = useState("");
	const [follower, setFollower] = useState("");
	const [following, setFollowing] = useState("");
	const [isInfluence, setIsInfluence] = useState("");
	const [isMe, setIsMe] = useState(false);
	const [buttonText, setButtonText] = useState("팔로우");
	const [feed, setFeed] = useState([]);
	const [getinfo, setGetInfo] = useState("Feed");
	const Authorization = useRecoilValue(loginState);
	const Navigate = useNavigate();
	const { id } = useParams();

	const followreq = () => {
		console.log("here");
		console.log(id);
		axios
			.post(
				`${process.env.REACT_APP_API}/api/follow/${id}`,
				{},
				{
					headers: { Authorization: Authorization },
				}
			)
			.then((response) => {
				console.log(response.data);
				if (response.data != null) {
					if (response.data.data === "팔로우 성공") {
						setButtonText("팔로우취소");
					} else {
						setButtonText("팔로우");
					}
				}
			});
	};

	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/userpage/${id}`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response.data);
				if (response.data !== null) {
					console.log(response.data);
					setBackground(response.data.data.background);
					setProfile(response.data.data.profilePhoto);
					setNickname(response.data.data.nickname);
					setPersonalcolor(response.data.data.personalColor);
					setFeedCnt(response.data.data.feedCnt);
					setFollower(response.data.data.followerCnt);
					setFollowing(response.data.data.followingCnt);
					setIsInfluence(response.data.data.isInfluence);
					setFeed(response.data.data.feed);
					console.log(response.data.data.feed);

					console.log(response.data.data.feed[0]);
					setIsMe(response.data.data.isMe);
					if (!response.data.data.isMe) {
						//내 페이지가 아니고
						if (response.data.data.isFollow) {
							// 팔로우가 되어있으면
							setButtonText("팔로우취소");
						} else {
							setButtonText("팔로우");
						}
					}
				}
			});
	};
	useEffect(() => {
		getmapping();
		// setBackground("/static/background.jpg");
		// setProfile("/static/baseimg.png");
		// setNickname("은정이개고수33");
		// setPersonalcolor("흙톤");
		// setFeedCnt(0);
		// setFollower(0);
		// setFollowing(0);
		// setIsInfluence("USER");
	}, [buttonText]); // 빈 배열을 넣어서 컴포넌트가 처음 렌더링될 때 한 번만 실행되도록 합니다.

	const handleFeedDetail = (feedId) => {
		Navigate(`/feed/${feedId}`);
	};
	return (
		<div className="mypage_container">
			<div className="mypage_background-container">
				<img
					src={background}
					alt="background"
					className="mypage_background-picture"
				/>
				<img src={profile} alt="profile" className="mypage_profile-picture" />
				{!isMe && (
					<button onClick={followreq} className="mypage_follow-button">
						{buttonText}
					</button>
				)}
			</div>
			<div className="mypage_personal_info">
				<div className="mypage_personal_info_inner">
					<span className="mypage_gap"></span>
					<div>
						<label className="mypage_label">{nickname}</label>
						<div className="mypage_text-left">{personalcolor}</div>
					</div>
					<div className="mypage_personal_info_feed">
						<div className="mypage_group-left">
							<div className="mypage_group-left">Post</div>
							<div className="mypage_cnt">{feedcnt}</div>
						</div>
						<span className="mypage_gap"></span>

						<Link to={`/userpage/follower/${id}`}>
							<div className="mypage_group-left">
								<div className="mypage_group-left">Follower</div>
								<div className="mypage_cnt">{follower}</div>
							</div>
						</Link>
						<span className="mypage_gap"></span>

						<Link to={`/userpage/following/${id}`}>
							<div className="mypage_group-left">
								<div className="mypage_group-left">Following</div>
								<div className="mypage_cnt">{following}</div>
							</div>
						</Link>
						<span className="mypage_gap"></span>
					</div>
				</div>
			</div>

			{isMe ? (
				<>
					{isInfluence === "USER" ? (
						<div className="mypage_menu_button">
							<Link to="/changenickname">
								<button className="mypage_button1">
									<AssignmentOutlinedIcon />
									<div className="mypage_group-left">list</div>
								</button>
							</Link>
							<Link to="/changenickname">
								<button className="mypage_button2">
									<ShoppingCartOutlinedIcon />
									<div className="mypage_group-left">cart</div>
								</button>
							</Link>
							<Link to="/feed/write">
								<button className="mypage_button3">
									<AddOutlinedIcon />
									<div className="mypage_group-left">write</div>
								</button>
							</Link>
							<Link to="/changeinfo">
								<button className="mypage_button4">
									<SettingsOutlinedIcon />
									<div className="mypage_group-left">info</div>
								</button>
							</Link>
						</div>
					) : (
						<div>
							<div className="mypage_menu_button">
								<Link to="/feedwrite">
									<button className="mypage_button5">
										<AssignmentOutlinedIcon />
										<div className="mypage_group-left">주문목록</div>
									</button>
								</Link>
								<Link to="/feedwrite">
									<button className="mypage_button6">
										<ShoppingCartOutlinedIcon />
										<div className="mypage_group-left">장바구니</div>
									</button>
								</Link>
							</div>
							<div className="mypage_menu_button">
								<Link to="/handleproduct">
									<button className="mypage_button7">
										<AddShoppingCartOutlinedIcon />
										<div className="mypage_group-left">상품판매</div>
									</button>
								</Link>
								<Link to="/feed/write">
									<button className="mypage_button8">
										<AddOutlinedIcon />
										<div className="mypage_group-left">만들기</div>
									</button>
								</Link>
								<Link to="/changeinfo">
									<button className="mypage_button9">
										<SettingsOutlinedIcon />
										<div className="mypage_group-left">정보수정</div>
									</button>
								</Link>
							</div>
						</div>
					)}
				</>
			) : (
				<br />
			)}

			<br />
			<hr className="mypage_hr" />
			<div className="mypage_menu_button">
				<button className="mypage_button_feed">Feed</button>
				<button className="mypage_button_challenge">Challenge</button>
				<button className="mypage_button_makeup">Make up</button>
			</div>
			<hr className="mypage_hr" />
			<div className="feedMain_body">
				<div className="feedMain_body_info">
					<div className="feedMain_body_container">
						{feed.map((feedimg, index) => {
							return (
								<div className="feedMain_body_info_item" key={index}>
									<img
										src={feedimg.feedImages[0].imagePath}
										alt=""
										onClick={() => handleFeedDetail(feedimg.id)}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
