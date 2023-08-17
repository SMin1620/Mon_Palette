import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./HandleProduct.css"; // 스타일 파일 임포트
import { useRecoilValue } from "recoil";
import { loginState } from "src/user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const HandleProduct = () => {
	const [userProfile, setUserProfile] = useState("/static/신짱구.png");
	const [userName, setUserName] = useState("판매자이름");
	const [userPhone, setUserPhone] = useState("판매자연락처");
	const [productCnt, setProductCnt] = useState(0);
	const [productList, setProductList] = useState([]);
	const [check, setCheck] = useState(false);
	const id = useRecoilValue(userId);
	const Authorization = useRecoilValue(loginState);

	const Navigate = useNavigate();
	useEffect(() => {
		if (Authorization) {
			getmapping();
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
			.get(`${process.env.REACT_APP_API}/api/item/manage`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					console.log(response.data.data);
					setProductCnt(response.data.data.length);
					setProductList(response.data.data);
				}
			});
	};
	const deleteItem = (id) => {
		axios
			.delete(`${process.env.REACT_APP_API}/api/item/${id}`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data === true) {
					if (check) {
						setCheck(false);
					} else setCheck(true);
				}
			});
	};
	return (
		<div className="handleproduct_container">
			<br />
			<label className="handleproduct_label">판매자정보</label>
			<div className="handleproduct_content">
				<div className="handleproduct_object">
					<div className="itemregist_profileimg_div">
						<img
							className="itemregist_profileimg"
							src={userProfile}
							alt="이미지 불러오기 실패"
						/>
					</div>
					<div>
						<label className="handleproduct_label">{userName}</label>
						<label className="handleproduct_label">{userPhone}</label>
					</div>
				</div>
			</div>
			<br />
			<label className="handleproduct_label">판매중인 상품 목록</label>
			<div className="handleproduct_content">
				<div className="handleproduct_product_header">
					<span className="handleproduct_label">판매중인 상품 갯수 : </span>
					&nbsp;
					<span className="handleproduct_productCnt">{productCnt}개</span>
				</div>
				<div className="handleproduct_content">
					{productList &&
						productList.map((product, index) => (
							<div>
								<hr />

								<div key={index} className="handleproduct_object_with_icon">
									<div
										className="handleproduct_object"
										onClick={(index) => {
											Navigate(`/shop/shopdetail/${product.id}`);
										}}
									>
										<div className="handleproduct_object_img">
											<img
												className="handleproduct_object_img_img"
												src={product.thumbnail}
												alt={index}
											/>
										</div>
										&nbsp; &nbsp;
										<div>
											<label className="handleproduct_label">
												{product.name}
											</label>
											<label className="handleproduct_label">
												{product.price}
											</label>
										</div>
									</div>
									<div className="handleproduct_object_icon">
										<EditNoteOutlinedIcon
											onClick={(e) => {
												Navigate(`/itemmodify/${product.id}`);
											}}
										/>
										<ClearOutlinedIcon
											onClick={(e) => {
												deleteItem(product.id);
											}}
										/>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<br />
			<Link to="/itemregist">
				<button className="itemregist_submit_button">+</button>
			</Link>
		</div>
	);
};
export default HandleProduct;
