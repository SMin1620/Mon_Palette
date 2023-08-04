//get요청 uri 수정

import React, { useState, useEffect } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ChangeInfo.css"; // 스타일 파일 임포트
import { useRecoilValue } from "recoil";
import { loginState } from "./Atom/loginState";
import { useNavigate } from "react-router-dom";
import "./Modal.css";
import AWS from "aws-sdk";
import { uuid } from 'react-uuid';

const ChangeInfo = () => {
	const [background, setBackground] = useState("");
	const [profile, setProfile] = useState("");
	const [nickname, setNickname] = useState("");
	const [personalcolor, setPersonalcolor] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [check, setCheck] = useState(true);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const Authorization = useRecoilValue(loginState);
	const Navigate = useNavigate();

	// AWS 연동
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

	useEffect(() => {
		if (Authorization) {
			getmapping();
		}
	}, [check]);
	const modify_picture = (event, back) => {
		const file = event.target.files[0]; // 사용자가 선택한 파일 가져오기
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imageBlob = new Blob([e.target.result], { type: file.type });
				const replaceFileName = file.name.replace(/[^A-Za-z0-9_.-]/g, "")
				const params = {
					ACL: "public-read",
					Body: imageBlob, // Use the image data (blob) as the Body of the S3 object
					Bucket: BUCKET,
					Key: uuid() + replaceFileName, // Use a valid key for the object, for example, the file name
				};
				myBucket.putObject(params, (err, data) => {
					if (err) {
						console.error("Error uploading image to S3:", err);
					} else {
						if (back === "background") {
							handleImageUrlFromS3(params.Key).then((imageUrl) => {
								changebackground(imageUrl);
							});
						} else {
							handleImageUrlFromS3(params.Key).then((imageUrl) => {
								changeprofile(imageUrl);
							});
						}
					}
				});
			};
			reader.readAsArrayBuffer(file); // Read the file data as ArrayBuffer
		}
	};

	const handleImageUrlFromS3 = async (key) => {
		const params = {
			Bucket: BUCKET,
			Key: key,
		};

		try {
      const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`
      return imageUrl
    } catch (error) {
      console.log(error)
      return null
    }
	};

	const getmapping = () => {
		axios
			.get(`${process.env.REACT_APP_API}/api/user/info`, {
				headers: { Authorization: Authorization },
			})
			.then((response) => {
				if (response.data.data !== null) {
					setNickname(response.data.data.nickname);
					setPersonalcolor(response.data.data.personalcolor);
					setPhone(response.data.data.phone);
					setAddress(response.data.data.address);
					setProfile(response.data.data.profilePhoto);
					setBackground(response.data.data.background);
				}
			});
	};

	const changebackground = (url) => {
		axios
			.put(
				`${process.env.REACT_APP_API}/api/user/background`,
				{ backgroundImage: url },
				{ headers: { Authorization: Authorization } }
			)
			.then((response) => {
				if (response.data !== null) {
					if (check) {
						setCheck(false);
					} else {
						setCheck(true);
					}
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

	const changeprofile = (url) => {
		axios
			.put(
				`${process.env.REACT_APP_API}/api/user/profile`,
				{ profileImage: url },
				{ headers: { Authorization: Authorization } }
			)
			.then((response) => {
				if (response.data !== null) {
					if (check) {
						setCheck(false);
					} else {
						setCheck(true);
					}
				}
			})
			.catch((err) => {
				console.error("error", err);
			});
	};

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
				if (response.data.data === true) {
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
				<img
					src={background}
					alt="background"
					className="changeInfo_background-picture"
				/>
			</div>
			<div className="changeInfo_background_edit">
				<label htmlFor="picture-input" className="picture-edit-label">
					<EditOutlinedIcon />
				</label>
				<input
					id="picture-input"
					className="picture-edit"
					type="file"
					onChange={(event) => modify_picture(event, "background")}
					accept="image/*"
				/>
			</div>
			<br />
			<div className="changeInfo_profile-container">
				<div className="changeInfo_profile-content">
					<img
						src={profile}
						alt="profile"
						className="changeInfo_profile-picture"
					/>
					<div className="changeInfo_profile_edit">
						<label htmlFor="picture-input2" className="picture-edit-label">
							<EditOutlinedIcon />
						</label>
						<input
							id="picture-input2"
							className="picture-edit"
							type="file"
							onChange={(event) => modify_picture(event, "profile")}
							accept="image/*"
						/>
					</div>
				</div>
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
