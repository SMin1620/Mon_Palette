import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
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
	const [selectedImage, setSelectedImage] = useState(null);

	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const Authorization = useRecoilValue(loginState);
	const Navigate = useNavigate();
	
	useEffect(() => {
		
		if (Authorization) {
			getmapping();
			
		}
	}, [background]);
	const backgroundmodify = (event) => {
		const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기
		if (file) {
		  const imageUrl = URL.createObjectURL(file); // 선택한 파일로부터 이미지 URL 생성
		  setSelectedImage(imageUrl); // 상태 업데이트
		  setBackground(imageUrl);
		  changebackground();
		  setSelectedImage("");
		}
	  };

	  const profilemodify = (event) => {
		const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기
		if (file) {
		  const imageUrl = URL.createObjectURL(file); // 선택한 파일로부터 이미지 URL 생성
		  setSelectedImage(imageUrl); // 상태 업데이트
		  setBackground(imageUrl);
		  changeprofile();
		  setSelectedImage("");
		}
	  };
	const getmapping = () => {
		console.log(loginState);
		axios
			.get(`${process.env.REACT_APP_API}/api/user/info`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				console.log(response.data);
				if (response.data.data !== null) {
					setNickname(response.data.data.nickname);
					setPersonalcolor(response.data.data.personalcolor);
					setPhone(response.data.data.phone);
					setAddress(response.data.data.address);
					console.log(response.data.data.background);
					console.log(profile);
					if(response.data.data.profilePhoto === null){
						setProfile("/static/baseimg.png");
					}else{
						setProfile(response.data.data.profilePhoto);
					}
					if(response.data.data.background === null){
						setBackground("/static/background.jpg");
					}else{
						setBackground(response.data.data.background);
					}					
				}				
 			});
	};

	const changebackground = () => {
		axios
		.put(
			`${process.env.REACT_APP_API}/api/user/background`,
			{ background: background },
			{ headers: { Authorization: Authorization } }
		)
		.then((response) => {
			console.log(response);
			if (response.data !== null) {
				Navigate("/changeinfo");
			} else {
			}
		})
		.catch((err) => {
			console.error("error", err);
		});
	}

	const changeprofile= () => {
		axios
		.put(
			`${process.env.REACT_APP_API}/api/user/profile`,
			{ profile: profile },
			{ headers: { Authorization: Authorization } }
		)
		.then((response) => {
			console.log(response);
			if (response.data !== null) {
				Navigate("/changeinfo");
			} else {
			}
		})
		.catch((err) => {
			console.error("error", err);
		});
	}

	const leave = () => {
		setIsModalOpen(true);
	};

	//회원탈퇴 함수 구현
	const Withdraw = () => {
		axios
			.delete(`${process.env.REACT_APP_API}/api/user`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				setIsModalOpen(false);
				if (response.data.data.check === true) {
					Navigate("/");
				}
			});
	};

	//회원탈퇴 모달창
	const closeModal = () => {
		setIsModalOpen(false);
	};
	
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

	return (
		<div className="changeInfo_container">
			<div className="changeInfo_background-container">
				{selectedImage ? 
				(<img src={selectedImage} alt="My Image" />):(
					<img
					src={background}
					alt="background"
					className="changeInfo_background-picture"
					/>
			    )}
			</div>
			<div className="changeInfo_background_edit">
			<label htmlFor="picture-input" className="picture-edit-label">
        		<EditOutlinedIcon />
      		</label>
      		<input
        		id="picture-input"
        		className="picture-edit"
        		type="file"
        		onChange={backgroundmodify}
        		accept="image/*"
      		/>	
			</div>
			<br />
			<div className="changeInfo_profile-container">
				<span className="changeInfo_profile-content">
					<img
						src={profile}
						alt="profile"
						className="changeInfo_profile-picture"
					/>
				
				<span className="changeInfo_profile_edit">
				<label htmlFor="picture-input" className="picture-edit-label">
        		<EditOutlinedIcon />
      		</label>
      		<input
        		id="picture-input"
        		className="picture-edit"
        		type="file"
        		onChange={profilemodify}
        		accept="image/*"
      		/>	
				</span>
				</span>
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
