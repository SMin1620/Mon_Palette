import React, { useState, useEffect } from "react";
import axios from "axios";
import { userId } from "../user/components/Atom/UserId";
import { loginState } from "../user/components/Atom/loginState";
import { useRecoilValue } from "recoil";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MakeUpResult.css";
const MakeUpResult = () => {
	const location = useLocation();
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
		"/static/slide1.png",
		"/static/slide2.png",
		"/static/slide1.png",
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
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImage.length);
	};

	useEffect(() => {
		const interval = setInterval(nextSlide, 3000); // 3초마다 다음 슬라이드로 이동
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="makeup_result_container">
			<div className="makeup_result_img_container">
				<Slider className="makeup_slider_style" {...settings}>
					{slideImage.map((slide, index) => (
						<div key={index} className="makeup_flex">
							<img
								className="makeup_slideimg"
								src={slide}
								alt={`Slide ${index + 1}`}
							/>
						</div>
					))}
				</Slider>
				<img
					className="makeup_result_img"
					src={resultImage}
					alt="이미지가 안나와요 힝"
				/>
			</div>
		</div>
	);
};

export default MakeUpResult;
