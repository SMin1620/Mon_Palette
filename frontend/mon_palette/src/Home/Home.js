import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { loginState } from "../user/components/Atom/loginState";
import { userId } from "../user/components/Atom/UserId";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";
import Function from "./Function";
import "./Home.css";
function Home() {
	const [feedList, setFeedList] = useState([]);
	const Authorization = useRecoilValue(loginState);
	const UserId = useRecoilValue(userId);
	const [feedPage, setFeedPage] = useState(0);

	// 무한스크롤 구현
	const preventRef = useRef(true);
	const obsRef = useRef(null);
	const endRef = useRef(false);

	const Navigate = useNavigate();
	useEffect(() => {
		if (feedPage !== 0) {
			getFeed();
		}
	}, [feedPage]);

	useEffect(() => {
		getFeed(); // axios 요청 보내기
		const observer = new IntersectionObserver(handleObs, { threshold: 0.5 }); // 페이지 최초 렌더링시 옵저버 생성

		if (obsRef.current) observer.observe(obsRef.current);
		return () => {
			observer.disconnect();
		}; // 페이지 언마운트시 옵저버 해제
	}, []);

	// 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
	const handleObs = (entries) => {
		const target = entries[0];
		if (!endRef.current && target.isIntersecting && preventRef.current) {
			preventRef.current = false; // 옵저버 중복 실행 방지
			setFeedPage((prev) => prev + 1);
		}
	};
	const getFeed = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/feed?page=${feedPage}`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response);
				if (response.data !== null) {
					//setFeedList(response.data.data); // 데이터를 배열로 감싸서 상태 업데이트
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const handleFeedDetail = (feedId) => {
		Navigate(`/feed/${feedId}`);
	};
	return (
		<div className="main_container">
			<div className="main_slide">
				<Slide />
			</div>
			<br />
			<br />
			<div className="main_function">
				<Function />
			</div>
			<br />
			<div className="Home_TodayPalette">Today's Palette</div>
			<br />
			{feedList === undefined || feedList.length === 0 ? (
				<div className="Home_notfeed"> 인기게시글 없음 ... 글좀써줘잉 </div>
			) : (
				feedList.map((info, index) => {
					return (
						<div className="feedMain_body">
							<div className="feedMain_body_info">
								<div className="feedMain_body_container">
									<div className="feedMain_body_info_item" key={index}>
										<img
											src={info.feedImages[0].imagePath}
											alt=""
											onClick={() => handleFeedDetail(info.id)}
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}

export default Home;
