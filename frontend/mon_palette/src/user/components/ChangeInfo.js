//get요청 uri 수정

import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChangeInfo.css"; // 스타일 파일 임포트
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const Authorization = useRecoilValue(loginState);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const Navigate = useNavigate();
	const Modal = ({ isOpen, onClose, children }) => {
		if (!isOpen) return null;

		return (
			<div className="modal-container">
				<div className="modal-content">{children}</div>
				<div className="modal-button-container">
					<button className="withdraw_modal-button" onClick={Withdraw}>
						확인
					</button>
					<span class="button-gap" />
					<button className="withdraw_modal-button" onClick={closeModal}>
						취소
					</button>
				</div>
			</div>
		);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	//회원탈퇴 함수 구현
	const Withdraw = () => {
		axios
			.delete("http://192.168.30.130:8080/api/user", {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				setIsModalOpen(false);
				if (response.data.data.check === true) {
					Navigate("/");
				}
			});
	};
	const leave = () => {
		setIsModalOpen(true);
	};

	const getmapping = () => {
		console.log(loginState);
		axios
			.get("http://192.168.30.130:8080/api/user/info", {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.data !== null) {
					setBackground(response.data.data.background);
					setProfile(response.data.data.profilePhoto);
					setNickname(response.data.data.nickname);
					setPersonalcolor(response.data.data.personalcolor);
					setPhone(response.data.data.phone);
					setAddress(response.data.data.address);
				}
			});
	};

	useEffect(() => {
		// 초기 값을 설정할 로직을 이곳에 작성합니다.
		if (Authorization) {
			getmapping();
		}
	}, [Authorization]);
	return (
		<div className="changeInfo_container">
			<div className="changeInfo_background-container">
				<img
					src={background}
					alt="background"
					className="changeInfo_background-picture"
				/>
			</div>
			<br />
			<div className="changeInfo_profile-container">
				<img
					src={profile}
					alt="profile"
					className="changeInfo_profile-picture"
				/>
			</div>
			<br />
			<br />
			<br />
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="nickname">
						닉네임
					</label>
					<span>{nickname}</span>
				</div>
				<Link to="/changenickname">
					<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
				</Link>
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="personalcolor">
						퍼스널컬러
					</label>
					<span>{personalcolor}</span>
				</div>
				<Link to="/changepersonalcolor">
					<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
				</Link>
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="password">
						비밀번호
					</label>
				</div>
				<Link to="/changepassword">
					<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
				</Link>
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="phone">
						휴대폰번호
					</label>
					<span>{phone}</span>
				</div>
				<Link to="/changephone">
					<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
				</Link>
			</div>
			<div className="changeInfo_form-group">
				<div className="changeInfo_group-left">
					<label className="changeInfo_label" htmlFor="address">
						주소
					</label>
					<span>{address}</span>
				</div>
				<Link to="/changeaddress">
					<ChevronRightOutlinedIcon className="changeInfo_arrow-icon" />
				</Link>
			</div>
			<div className="changeInfo_form-group">
				<label className="changeInfo_label">회 원 탈 퇴</label>

				<ChevronRightOutlinedIcon
					className="changeInfo_arrow-icon"
					onClick={leave}
				/>
			</div>
			<Modal isOpen={isModalOpen} onClose={closeModal}>
				<h3>진짜 내가 필요없어요? ._.</h3>
			</Modal>
		</div>
	);
};

export default ChangeInfo;
