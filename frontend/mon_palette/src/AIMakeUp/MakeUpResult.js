import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { userId } from "../user/components/Atom/UserId";
import { loginState } from "../user/components/Atom/loginState";
import { useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MakeUpResult.css";
function Home() {
	const Authorization = useRecoilValue(loginState);
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false, // 자동 슬라이드 활성화
		prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
		nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
	};

	const [resultImage, setResultImage] = useState("/static/google.png");
	const [slideImage, setSlideImage] = useState([
		"/static/신짱구.png",
		"/static/신짱구.png",
		"/static/신짱구.png",
	]);

	// useEffect(() => {
	// 	if (Authorization) {
	// 		getimage_with_tone();
	// 	}
	// }, []);

	// const getimage_with_tone = () => {
	// 	axios
	// 		.get("http://192.168.30.224:8000/api", {
	// 			headers: { Authorization: Authorization },
	// 		})
	// 		.then((response) => {
	// 			if (response.data.data !== null) {
	// 				setSlideImage(response.data.data);
	// 			}
	// 		});
	// };
	// const getimage_no_tone = () => {
	// 	axios
	// 		.get("http://192.168.30.224:8000/api", {
	// 			headers: { Authorization: Authorization },
	// 		})
	// 		.then((response) => {
	// 			if (response.data.data !== null) {
	// 				setSlideImage(response.data.data);
	// 			}
	// 		});
	// };

	// const getresultimg = () => {
	// 	axios
	// 		.post("http://192.168.30.224:8000/api", {
	// 			headers: { Authorization: Authorization },
	// 		})
	// 		.then((response) => {
	// 			if (response.data.data !== null) {
	// 				setResultImage(response.data.data);
	// 			}
	// 		});
	// };

	return (
		<div>
			<div className="makeup_result_container">
				<div className="makeup_result_img_container">
					<Slider {...settings}>
						{slideImage.map((slide, index) => (
							<div key={index}>
								<img
									className="makeup_slideimg"
									src={slide}
									alt={`Slide ${index + 1}`}
								/>
							</div>
						))}
					</Slider>
					<div className="makeup_result">
						<img
							className="makeup_result_img"
							src={resultImage}
							alt="이미지가 안나와요 힝"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
