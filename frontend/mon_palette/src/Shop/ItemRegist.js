import React, { useState, useEffect } from "react";
import "./ItemRegist.css";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { loginState } from "src/user/components/Atom/loginState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import AWS from "aws-sdk";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { userId } from "src/user/components/Atom/UserId";

const ItemRegist = () => {
	const [userProfile, setUserProfile] = useState("/static/신짱구.png");
	const [userName, setUserName] = useState("판매자이름");
	const [userPhone, setUserPhone] = useState("판매자연락처");
	const [mainCategory, setMainCategory] = useState([]);
	const [subCategory, setSubCategory] = useState([]);
	const [mainCategoryset, setMainCategorySet] = useState("");
	const [subCategoryset, setSubCategorySet] = useState("");
	const [price, setPrice] = useState("");
	const [sale, setSale] = useState("");
	const [minDate, setMinDate] = useState(new Date());
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [itemName, setItemName] = useState("");
	const [itemContent, setItemContent] = useState("");
	const [itemImg, setItemImg] = useState([]);
	const [itemImgUrl, setItemImgUrl] = useState([]);
	const [itemContentImg, setItemContentImg] = useState([]);
	const [itemContentImgUrl, setItemContentImgUrl] = useState([]);
	const [itemCountLimit, setItemCountLimit] = useState("");
	const [options, setOptions] = useState([]);
	const [inputOption, setInputOption] = useState("");
	const [inputCount, setInputCount] = useState("");
	const [manufacture, setManufacture] = useState("");
	const [deliveryFee, setDeliveryFee] = useState("");
	const [categoryParentId, setCategoryParentId] = useState();
	const [check, setCheck] = useState(false);
	const id = useRecoilValue(userId);
	const Authorization = useRecoilValue(loginState);

	const Navigate = useNavigate();
	const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_ID;
	const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_PW;
	const REGION = process.env.REACT_APP_AWS_S3_REGION;
	const BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;

	AWS.config.update({
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_ACCESS_KEY,
	});

	const myBucket = new AWS.S3({
		params: { Bucket: BUCKET },
		region: REGION,
	});

	const handleImageUrlFromS3 = async (key) => {
		const params = {
			Bucket: BUCKET,
			Key: key,
		};

		try {
			if (params.Key.includes(" ")) {
				const replaceFileName = params.Key.replace(/\s/g, "+");
				const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${replaceFileName}`;
				return imageUrl;
			} else {
				const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`;
				return imageUrl;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	useEffect(() => {
		if (Authorization) {
			getmapping();
		}
	}, []);

	useEffect(() => {
		if (check) {
			handleCreate();
			setCheck(false);
		}
	}, [check]);

	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/info`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					console.log(response.data.data);
					setUserProfile(response.data.data.profilePhoto);
					setUserName(response.data.data.nickname);
					setUserPhone(response.data.data.phone);
				}
			});

		axios
			.get(`${process.env.REACT_APP_API}/api/category/all`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					setMainCategory(response.data.data[0].children);
					setSubCategory(response.data.data[0].children[0].children);
				}
			});
	};

	// 이미지 미리보기 올리기 및 제거
	const handleImageUploadItem = (e) => {
		const files = e.target.files[0];
		if (!files) {
			setItemImg(itemImg);
		} else {
			if (itemImg.length > 9) {
				alert("최대 10장까지 등록 가능합니다.");
				document.querySelector("#itemImg").disabled = true;
			} else {
				setItemImg((prevImages) => [...prevImages, files]);
			}
		}
	};

	// 이미지 미리보기 올리기 및 제거
	const handleImageUploadContent = (e) => {
		const files = e.target.files[0];
		if (!files) {
			setItemContentImg(itemContentImg);
		} else {
			if (itemContentImg.length > 9) {
				alert("최대 10장까지 등록 가능합니다.");
				document.querySelector("#itemContentImg").disabled = true;
			} else {
				setItemContentImg((prevImages) => [...prevImages, files]);
			}
		}
	};

	const Imagesave = async () => {
		if (itemImg.length === 0) {
			alert("사진을 선택하세요!!");
			return;
		} else if (itemContentImg.length === 0) {
			alert("사진을 입력하세요!!");
			return;
		} else {
			try {
				await Promise.all(
					itemImg.map(async (imageFile) => {
						const replaceFileName = imageFile.name.includes(" ")
							? imageFile.name.replace(/\s/g, "")
							: imageFile.name;
						const params = {
							ACL: "public-read",
							Body: imageFile,
							Bucket: BUCKET,
							Key: uuid() + replaceFileName,
						};
						try {
							const _temp = await myBucket.putObject(params).promise();
							const S3Url = await handleImageUrlFromS3(params.Key);
							setItemImgUrl((prev) => [...prev, S3Url]);
						} catch (error) {
							console.log(error);
						}
					})
				);
				await Promise.all(
					itemContentImg.map(async (imageFile) => {
						const replaceFileName = imageFile.name.includes(" ")
							? imageFile.name.replace(/\s/g, "")
							: imageFile.name;
						const params = {
							ACL: "public-read",
							Body: imageFile,
							Bucket: BUCKET,
							Key: uuid() + replaceFileName,
						};

						try {
							const _temp = await myBucket.putObject(params).promise();
							const S3Url = await handleImageUrlFromS3(params.Key);
							setItemContentImgUrl((prev) => [...prev, S3Url]);
						} catch (error) {
							console.log(error);
						}
					})
				);
				setCheck(true);
			} catch (error) {
				console.log(error);
			}
		}
	};
	console.log(itemImgUrl);
	// AWS로 이미지 저장하기
	const handleCreate = () => {
		console.log("here");
		axios
			.post(
				`${process.env.REACT_APP_API}/api/item/regist`,
				{
					itemName: itemName,
					price: price,
					discount: sale,
					content: itemContent,
					manufact: manufacture,
					deliveryFee: deliveryFee,
					thumbnail: itemImgUrl[0],
					maximum: itemCountLimit,
					createAt: startDate,
					endAt: endDate,
					itemOptionList: options,
					itemDetailImageList: itemContentImgUrl,
					itemPhotoList: itemImgUrl,
					categoryName: subCategoryset,
					categoryParentId: categoryParentId,
				},
				{
					headers: { Authorization: Authorization },
				}
			)
			.then((response) => {
				console.log(response);

				Navigate(`/handleproduct`);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleRemoveItem = (imageIndex) => {
		const fileUploadInput = document.querySelector("#itemImg");
		if (fileUploadInput !== null) {
			// 요소를 찾았을 때만 실행
			fileUploadInput.disabled = false;
		}
		setItemImg((prevImages) =>
			prevImages.filter((_, index) => index !== imageIndex)
		);
	};
	const handleRemoveContent = (imageIndex) => {
		const fileUploadInputcontent = document.querySelector("#itemContentImg");
		if (fileUploadInputcontent !== null) {
			// 요소를 찾았을 때만 실행
			fileUploadInputcontent.disabled = false;
		}
		setItemContentImg((prevImages) =>
			prevImages.filter((_, index) => index !== imageIndex)
		);
	};

	const addOption = () => {
		if (inputOption && inputCount) {
			let opt = {
				optionName: inputOption,
				stock: inputCount,
			};
			setOptions([...options, opt]);
			setInputOption("");
			setInputCount("");
		}
	};

	const deleteOption = (index) => {
		const updatedoptions = options.filter((_, i) => i !== index);
		setOptions(updatedoptions);
	};

	const setCategory = (categoryindex) => {
		console.log(categoryindex);
		setMainCategorySet(mainCategory[categoryindex].name);
		setSubCategory(mainCategory[categoryindex].children);

		console.log(mainCategory[categoryindex].children);
	};

	const setCategory2 = (categoryindex) => {
		setSubCategorySet(mainCategory[categoryindex].name);
		setCategoryParentId(subCategory[categoryindex].id);

		console.log(subCategory[categoryindex].id);
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
			<label className="itemregist_label">카테고리</label>
			<div className="itemregist_content_category">
				<div className="itemregist_content_category_select">
					<label className="itemregist_label">대분류</label>
					<select
						className="itemregist_category_select"
						onClick={(e) => {
							setCategory(e.target.selectedIndex);
						}}
					>
						{mainCategory.map((category, index) => (
							<option key={index} value={category}>
								{category.name}
							</option>
						))}
					</select>
				</div>
				<div className="itemregist_content_category_select">
					<label className="itemregist_label">중분류</label>
					<select
						className="itemregist_category_select"
						onClick={(e) => setCategory2(e.target.selectedIndex)}
					>
						{subCategory.map((category2, index) => (
							<option key={index} value={category2}>
								{category2.name} {/* 카테고리 이름 */}
							</option>
						))}
					</select>
				</div>
			</div>
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
					minDate={minDate}
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

					{options.map((opt, index) => (
						<div key={index}>
							<div className="itemregist_optionlist_option">
								{opt.optionName}
							</div>
							<div className="itemregist_optionlist_info">
								<div>수량 : {opt.stock}</div>
								&nbsp; &nbsp;
								<RemoveOutlinedIcon
									sx={{ fontSize: 20 }}
									className="itemregist_icon"
									onClick={() => deleteOption(index)}
								/>
							</div>
						</div>
					))}
					<div className="itemregist_option_box">
						<div className="itemregist_option_info">
							<input
								type="text"
								className="itemregist_option_input"
								value={inputOption}
								onChange={(e) => setInputOption(e.target.value)}
								placeholder="option"
							/>
						</div>
						<div className="itemregist_option_info">
							<label className="itemregist_label">판매수량 : </label>
							&nbsp;
							<div className="itemregist_optionlist_info">
								<input
									type="text"
									className="itemregist_stock_input"
									value={inputCount}
									onChange={(e) => setInputCount(e.target.value)}
								/>
								<AddOutlinedIcon
									sx={{ fontSize: 20 }}
									className="itemregist_icon"
									onClick={addOption}
								/>
							</div>
						</div>
					</div>
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
						<label htmlFor="itemImg" className="picture-edit-label">
							<FileUploadOutlinedIcon />
						</label>
						<input
							id="itemImg"
							className="picture-edit"
							type="file"
							onChange={handleImageUploadItem}
							accept="image/*"
						/>
					</div>
					<br />
					<div className="feed_write_top_image_wrap">
						{itemImg.map((image, index) => (
							<div key={index} className="feed_write_top_image_container">
								<div className="feed_write_top_image_item">
									<img src={URL.createObjectURL(image)} alt={index} />
									<button onClick={() => handleRemoveItem(index)}>-</button>
								</div>
							</div>
						))}
					</div>
					<div className="itemregist_price_info">
						<label className="itemregist_label">상품설명이미지</label>
						<label htmlFor="itemContentImg">
							<FileUploadOutlinedIcon />
						</label>
						<input
							id="itemContentImg"
							className="picture-edit"
							type="file"
							onChange={handleImageUploadContent}
							accept="image/*"
						/>
					</div>
					<div className="feed_write_top_image_wrap">
						{itemContentImg.map((image, index) => (
							<div key={index} className="feed_write_top_image_container">
								<div className="feed_write_top_image_item">
									<img src={URL.createObjectURL(image)} alt={index} />
									<button onClick={() => handleRemoveContent(index)}>-</button>
								</div>
							</div>
						))}
					</div>

					<br />
					<div className="itemregist_price_info">
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
			<button className="itemregist_submit_button" onClick={Imagesave}>
				SUBMIT
			</button>
		</div>
	);
};

export default ItemRegist;
