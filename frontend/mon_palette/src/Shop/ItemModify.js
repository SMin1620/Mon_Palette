import React, { useState, useEffect } from "react";
import "./ItemRegist.css";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { loginState } from "src/user/components/Atom/loginState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import { userId } from "src/user/components/Atom/UserId";

const ItemRegist = () => {
	const [userProfile, setUserProfile] = useState("/static/신짱구.png");
	const [userName, setUserName] = useState("판매자이름");
	const [userPhone, setUserPhone] = useState("판매자연락처");
	const [price, setPrice] = useState("");
	const [sale, setSale] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [itemName, setItemName] = useState("");
	const [itemContent, setItemContent] = useState("");
	const [itemImgUrl, setItemImgUrl] = useState([]);
	const [itemContentImgUrl, setItemContentImgUrl] = useState([]);
	const [itemCountLimit, setItemCountLimit] = useState("");
	const [options, setOptions] = useState([]);
	const [manufacture, setManufacture] = useState("");
	const [deliveryFee, setDeliveryFee] = useState("");
	const id = useRecoilValue(userId);

	const itemId = useParams().itemid;
	const Authorization = useRecoilValue(loginState);

	const Navigate = useNavigate();

	useEffect(() => {
		if (Authorization) {
			getmapping();
		}
	}, []);

	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/info`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					setUserProfile(response.data.data.profilePhoto);
					setUserName(response.data.data.nickname);
					setUserPhone(response.data.data.phone);
				}
			});

		console.log("here");
		axios
			.get(`${process.env.REACT_APP_API}/api/item/detail/${itemId}`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response);
				setItemName(response.data.data.name);
				setPrice(response.data.data.price);
				setSale(response.data.data.discount);
				setItemContent(response.data.data.content);
				setManufacture(response.data.data.manufact);
				setDeliveryFee(response.data.data.deliveryFee);
				setItemCountLimit(response.data.data.maximum);
				setOptions(response.data.data.itemOptionList);
				setItemImgUrl(response.data.data.itemPhotoDtoList);
				setItemContentImgUrl(response.data.data.itemDetailPhotoDtoList);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const change = () => {
		axios
			.put(
				`${process.env.REACT_APP_API}/api/item/${itemId}`,
				{
					name: itemName,
					price: price,
					discount: sale,
					content: itemContent,
					manufact: manufacture,
					deliveryFee: deliveryFee,
					thumbnail: itemImgUrl[0].itemImage,
					maximum: itemCountLimit,
					createAt: startDate,
					endAt: endDate,
				},
				{ headers: { Authorization: Authorization } }
			)
			.then((response) => {
				console.log(response);
				if (response.data !== null) {
					Navigate("/handleProduct");
				} else {
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	return (
		<div className="itemregist_container">
			<br />
			<label className="itemregist_label">판매자정보</label>
			<div className="itemregist_content">
				<div className="itemregist_profileimg_div">
					<img
						className="itemregist_profileimg"
						src={userProfile}
						alt="이미지 불러오기 실패"
					/>
				</div>
				<div>
					<label className="itemregist_label">{userName}</label>
					<label className="itemregist_label">{userPhone}</label>
				</div>
			</div>
			<br />

			<br />
			<label className="itemregist_label">판매가</label>
			<div className="itemregist_content">
				<div className="itemregist_price">
					<div className="itemregist_price_info">
						<label className="itemregist_label">판매가</label>
						<div className="itemregist_price_price">
							<input
								id="price"
								className="itemregist_price_input"
								type="number"
								value={price} // 수정: price 상태값으로 변경
								onChange={(e) => setPrice(e.target.value)} // 수정: 사용자 입력에 따라 price 상태 업데이트
							/>
							&nbsp;
							<div>원</div>
						</div>
					</div>
					<div className="itemregist_price_info">
						<label className="itemregist_label">배송비</label>

						<div className="itemregist_price_price">
							<input
								id="deliveryFee" // 수정: id를 'price'에서 'sale'로 변경
								className="itemregist_price_input"
								type="number"
								value={deliveryFee} // 수정: sale 상태값으로 변경
								onChange={(e) => setDeliveryFee(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
							/>
							&nbsp;
							<div>원</div>
						</div>
					</div>
					<div className="itemregist_price_info">
						<label className="itemregist_label">할인율</label>

						<div className="itemregist_price_price">
							<input
								id="sale" // 수정: id를 'price'에서 'sale'로 변경
								className="itemregist_price_input"
								type="number"
								value={sale} // 수정: sale 상태값으로 변경
								onChange={(e) => setSale(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
							/>
							&nbsp;
							<div>%</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<label className="itemregist_label">판매기간</label>
			<div className="itemregist_datepick">
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					placeholderText="start date"
					className="example-custom-input"
				/>
				<div>&nbsp;~&nbsp;</div>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					placeholderText="end date"
					className="example-custom-input"
				/>
			</div>
			<br />
			<label className="itemregist_label">상품정보</label>
			<div className="itemregist_content">
				<div className="itemregist_content_div">
					<label className="itemregist_label">제목</label>
					<input
						id="itemName" // 수정: id를 'price'에서 'sale'로 변경
						className="itemregist_content_input"
						type="text"
						value={itemName} // 수정: sale 상태값으로 변경
						onChange={(e) => setItemName(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
					/>
					<br />
					<br />
					<label className="itemregist_label">제조사</label>
					<input
						id="manufacture" // 수정: id를 'price'에서 'sale'로 변경
						className="itemregist_content_input"
						type="text"
						value={manufacture} // 수정: sale 상태값으로 변경
						onChange={(e) => setManufacture(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
					/>
					<br />
					<br />
					<label className="itemregist_label">옵션 설정</label>

					{options &&
						options.map((opt, index) => (
							<div key={index}>
								<div className="itemregist_optionlist_option">
									{opt.optionName}
								</div>
								<div className="itemregist_optionlist_info">
									<div>수량 : {opt.stock}</div>
									&nbsp; &nbsp;
								</div>
							</div>
						))}

					<br />
					<label className="itemregist_label">설명</label>
					<input
						id="itemName" // 수정: id를 'price'에서 'sale'로 변경
						className="itemregist_itemcontent_input"
						type="text"
						value={itemContent} // 수정: sale 상태값으로 변경
						onChange={(e) => setItemContent(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
					/>
					<br />
					<br />
					<div className="itemregist_price_info">
						<label className="itemregist_label">상품이미지</label>
					</div>
					<br />
					<div className="feed_write_top_image_wrap">
						{itemImgUrl &&
							itemImgUrl.map((image, index) => (
								<div key={index} className="feed_write_top_image_container">
									<div className="feed_write_top_image_item">
										<img src={image.itemImage} alt={index} />
									</div>
								</div>
							))}
					</div>
					<div className="itemregist_price_info">
						<label className="itemregist_label">상품설명이미지</label>
					</div>
					<div className="feed_write_top_image_wrap">
						{itemContentImgUrl &&
							itemContentImgUrl.map((image, index) => (
								<div key={index} className="feed_write_top_image_container">
									<div className="feed_write_top_image_item">
										<img src={image.itemImage} alt={index} />
									</div>
								</div>
							))}
					</div>

					<br />
					<div classNam e="itemregist_price_info">
						<label className="itemregist_label">인당 구매제한</label>
						<div className="itemregist_price_info">
							<input
								id="itemCountLimit" // 수정: id를 'price'에서 'sale'로 변경
								className="itemregist_limit_input"
								type="number"
								value={itemCountLimit} // 수정: sale 상태값으로 변경
								onChange={(e) => setItemCountLimit(e.target.value)} // 수정: 사용자 입력에 따라 sale 상태 업데이트
							/>
							&nbsp;
							<div>개</div>
						</div>
					</div>
				</div>
			</div>
			<br />
			<button className="itemregist_submit_button" onClick={change}>
				SUBMIT
			</button>
		</div>
	);
};

export default ItemRegist;
