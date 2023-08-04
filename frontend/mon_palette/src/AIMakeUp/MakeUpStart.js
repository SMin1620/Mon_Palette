import React, { useState, useEffect } from "react";
import styles from "./MakeUpStart.module.css";
import axios from "axios";
import { loginState } from "../user/components/Atom/loginState";
import { useRecoilValue } from "recoil";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";

const MakeUpStart = () => {
	const Authorization = useRecoilValue(loginState);
	const [uploadedImage, setUploadedImage] = useState(null);
	const Navigate = useNavigate();
	const handleStartLoading = () => {
		if (!uploadedImage) {
			return;
		}

		const formData = new FormData();
		formData.append("image", uploadedImage);

		axios
			.post(`http://192.168.30.224:8000/api/aimakeup`, {
				headers: {
					Authorization: Authorization,
					"Content-Type": "multipart/form-data",
				},
				data: formData,
			})
			.then((response) => {
				console.log(response);
				Navigate("/makeupresult");
			})
			.catch((err) => console.log(err));
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setUploadedImage(file);
	};

	const handleButtonClick = () => {
		document.getElementById("file-input").click();
	};

	return (
		<div>
			<div className={styles["button-container"]}>
				<Link to="/home">
					<CloseOutlinedIcon className={styles.exit} />
				</Link>
				{uploadedImage ? (
					<img
						className={styles.image}
						src={URL.createObjectURL(uploadedImage)}
						alt="Uploaded"
					/>
				) : (
					<div className={styles["text-container"]}>
						<div className={styles.text}>Personal</div>
						<div className={styles.text}>Make Up</div>
					</div>
				)}
				<button className={styles.button1} onClick={handleButtonClick}>
					Upload
				</button>
				<input
					id="file-input"
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					style={{ display: "none" }}
				/>
				<button
					className={styles.button2}
					onClick={handleStartLoading}
					disabled={!uploadedImage}
				>
					Start
				</button>
			</div>
		</div>
	);
};

export default MakeUpStart;
