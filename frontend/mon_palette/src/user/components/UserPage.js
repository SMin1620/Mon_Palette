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
	const [isoauth, setIsOauth] = useState(false);
	const [buttonText, setButtonText] = useState("팔로우");
	const [feed, setFeed] = useState([]);
	const [challenge, setChallenge] = useState([]);
	const [getinfo, setGetInfo] = useState("feed");
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
					setIsOauth(response.data.data.isOauth);
					setChallenge(response.data.data.challengeResDtoList);
					console.log(response.data.data.feed);

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
	useEffect(() => {}, [getinfo]);

	const handleFeedDetail = (feedId) => {
		if (getinfo === "feed") {
			Navigate(`/feed/${feedId}`);
		} else {
			Navigate(`/challenge/${feedId}`);
		}
	};

	const handleChallengeDetail = (id) => {
		Navigate(`/challenge/${id}`);
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
								<button className="mypage_button5">
									<AssignmentOutlinedIcon />
									<div className="mypage_group-left">order</div>
								</button>
							</Link>
							<Link to="/cart">
								<button className="mypage_button6">
									<ShoppingCartOutlinedIcon />
									<div className="mypage_group-left">cart</div>
								</button>
							</Link>

							<Link to="/changeinfo">
								<button className="mypage_button7">
									<SettingsOutlinedIcon />
									<div className="mypage_group-left">info</div>
								</button>
							</Link>
						</div>
					) : (
						<div className="mypage_menu_button">
							<Link to="/feedwrite">
								<button className="mypage_button1">
									<AssignmentOutlinedIcon />
									<div className="mypage_group-left">order</div>
								</button>
							</Link>
							<Link to="/cart">
								<button className="mypage_button2">
									<ShoppingCartOutlinedIcon />
									<div className="mypage_group-left">cart</div>
								</button>
							</Link>
							<Link to="/handleproduct">
								<button className="mypage_button3">
									<AddShoppingCartOutlinedIcon />
									<div className="mypage_group-left">sell</div>
								</button>
							</Link>

							<Link to={`/changeinfo`}>
								<button className="mypage_button4">
									<SettingsOutlinedIcon />
									<div className="mypage_group-left">info</div>
								</button>
							</Link>
						</div>
					)}
				</>
			) : (
				<br />
			)}

			<br />
			<hr className="mypage_hr" />
			<div className="mypage_menu_button">
				<button
					className="mypage_button_feed"
					onClick={() => setGetInfo("feed")}
				>
					Feed
				</button>
				<button
					className="mypage_button_challenge"
					onClick={() => setGetInfo("challenge")}
				>
					Challenge
				</button>
			</div>

			<hr className="mypage_hr" />
			<div className="feedMain_body">
				<div className="feedMain_body_info">
					{getinfo === "feed" ? (
						<div className="feedMain_body_container">
							{feed &&
								feed.map((feedimg, index) => {
									return (
										<div className="feedMain_body_info_item" key={index}>
											<img
												src={feedimg.feedImages[0].imagePath}
												alt="호오옹오오오오잉"
												onClick={() => handleFeedDetail(feedimg.id)}
											/>
										</div>
									);
								})}
						</div>
					) : (
						<div className="feedMain_body_container">
							{challenge &&
								challenge.map((challengeInfo, index) => {
									return (
										<div
											className="challengeHome_bottom_info_item"
											key={index}
											onClick={() => handleChallengeDetail(challengeInfo.id)}
										>
											<video src={challengeInfo.video} alt="" />
											<div className="challengeHome_bottom_info_item_user">
												<img src={challengeInfo.user.profileImage} alt="" />
												<div className="challengeHome_bottom_info_item_personal_color">
													<p>{challengeInfo.user.nickname}</p>
													{challengeInfo.user.personalColor ? (
														<p>{challengeInfo.user.personalColor}</p>
													) : (
														<p>null</p>
													)}
												</div>
											</div>
										</div>
									);
								})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserPage;
