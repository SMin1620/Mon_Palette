import React, { useState, useEffect } from "react";
import styles from "./MakeUpStart.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";

const MakeUpStart = () => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const Navigate = useNavigate();
	const handleStartLoading = () => {
		if (!uploadedImage) {
			return;
		}
		//axios
		Navigate("/makeupresult");
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
