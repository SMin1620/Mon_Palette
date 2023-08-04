import React, { useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true, // 자동 슬라이드 활성화
		autoplaySpeed: 3000, // 각 슬라이드 간의 자동 전환 속도 (3초)
		prevArrow: <></>, // 이전 화살표를 빈 컴포넌트로 지정
		nextArrow: <></>, // 다음 화살표를 빈 컴포넌트로 지정
	};

	const [slideImage, setSlideImage] = useState([
		"/static/slide1.png",
		"/static/slide2.png",
	]);

	const slide_link = [
		// Add more image URLs as needed
	];

	return (
		<Slider {...settings}>
			{slideImage.map((slide, index) => (
				<div key={index}>
					<Link to={slide_link[index]}>
						<img
							className="main_slideimg"
							src={slide}
							alt={`Slide ${index + 1}`}
						/>
					</Link>
				</div>
			))}
		</Slider>
	);
};

export default Slide;
