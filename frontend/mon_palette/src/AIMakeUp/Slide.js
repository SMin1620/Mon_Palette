import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { loginState } from "../user/components/Atom/loginState";
import { useRecoilValue } from "recoil";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Slide = () => {
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

	const [slideImage, setSlideImage] = useState([]);

	const getimage = () => {
		axios
			.get("http://192.168.30.224:8000/api", {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					setSlideImage(response.data.data);
				}
			});
	};

	return (
		<Slider {...settings}>
			{slideImage.map((slide, index) => (
				<div key={index}>
					<img
						className="main_slideimg"
						src={slide}
						alt={`Slide ${index + 1}`}
					/>
				</div>
			))}
		</Slider>
	);
};

export default Slide;
