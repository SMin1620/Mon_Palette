import React, { useState, useEffect } from "react";
import styles from "./MakeUpStart.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import uuid from "react-uuid";
const MakeUpStart = () => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [imgUrl, setImgUrl] = useState("");
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

	useEffect(() => {}, [uploadedImage]);

	const handleImageUrlFromS3 = async (key) => {
		const params = {
			Bucket: BUCKET,
			Key: key,
		};
		try {
			const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`;
			return imageUrl;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		setUploadedImage(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const imageBlob = new Blob([e.target.result], { type: file.type });
				const replaceFileName = file.name.replace(/[^A-Za-z0-9_.-]/g, "");
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
						handleImageUrlFromS3(params.Key).then((imageUrl) => {
							setImgUrl(imageUrl);
						});
					}
				});
			};
			reader.readAsArrayBuffer(file); // Read the file data as ArrayBuffer
		}
	};

	const handleButtonClick = () => {
		document.getElementById("file-input").click();
	};

	const handleStartLoading = () => {
		Navigate("/makeupresult", {
			state: { noMakeUp: imgUrl },
		});
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
