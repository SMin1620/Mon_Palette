import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom/loginState";
import { userId } from "./Atom/UserId";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./FollowingList.css"; // 스타일 파일 임포트

const FollowingList = () => {
	const [followingList, setFollowingList] = useState([]); // 상태를 빈 배열로 초기화
	const [isFollowList, setIsFollowList] = useState([]); // 팔로우 여부를 담는 배열로 상태로 초기화

	const [check, setCheck] = useState(false); // 상태를 빈 배열로 초기화
	const { id } = useParams();
	const Authorization = useRecoilValue(loginState);
	useEffect(() => {
		getmapping();
	}, []);
	useEffect(() => {}, [check]);

	const followreq = (reqid, index) => {
		console.log(reqid);
		axios
			.post(
				`${process.env.REACT_APP_API}/api/follow/${reqid}`,
				{},
				{
					headers: { Authorization: Authorization },
				}
			)
			.then((response) => {
				console.log(response.data.data);
				if (response.data != null) {
					if (response.data.data === "팔로우 취소") {
						isFollowList[index] = "follow";
					} else {
						isFollowList[index] = "unfollow";
					}
					setCheck((prevState) => !prevState);
				}
			});
	};

	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/follow/following/${id}`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data !== null) {
					console.log(response.data.data);
					setFollowingList(response.data.data); // 데이터를 배열로 감싸서 상태 업데이트
					setIsFollowList(
						response.data.data.map((following) => following.isFollow)
					);

					console.log(isFollowList);
					// setBackground(response.data.data.background);
					// setProfile(response.data.data.profilePhoto);
					// setNickname(response.data.data.nickname);
					// setPersonalcolor(response.data.data.personalColor);
					// setFeedCnt(response.data.data.feedCnt);
					// setFollower(response.data.data.followerCnt);
					// setFollowing(response.data.data.followingCnt);
					// setIsInfluence(response.data.data.isInfluence);
					// setIsMe(response.data.data.isMe);
				} else {
					setFollowingList([]);
				}
			});
	};
	return (
		<div className="following_container">
			{followingList === undefined || followingList.length === 0 ? (
				<div> 아무도 팔로우하지 않았어요 ! </div>
			) : (
				followingList.map((following, index) => {
					return (
						<div className="following_list" key={index}>
							<Link to={`/userpage/${following.id}`}>
								<div className="following_object">
									<img
										src={following.profileImage}
										alt="profile"
										className="following_profile-picture"
									/>
									<span className="following_gap"></span>
									<span className="following_nickname">
										{following.nickname}
									</span>
								</div>
							</Link>

							<button
								className="following_follow-button"
								onClick={() => followreq(following.id, index)}
							>
								{isFollowList[index]}
							</button>
						</div>
					);
				})
			)}
		</div>
	);
};
export default FollowingList;
