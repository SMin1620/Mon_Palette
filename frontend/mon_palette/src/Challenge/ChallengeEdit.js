import React, { useState, useEffect } from 'react';
import './ChallengeEdit.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from 'src/user/components/Atom/loginState';

import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import axios from 'axios';

function ChallengeEdit() {
  const location = useLocation()
  const token = useRecoilValue(loginState)
  const navigate = useNavigate()
  const [challengeInfo, setChallengeInfo] = useState("")
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [previewVideo, setPreviewVideo] = useState(null)
  const [caption, setCaption] = useState('')
  const [update, setUpdate] = useState(false)

  console.log(location)
  useEffect (() => {
    setChallengeInfo(location.state.challengeInfo)
    setSelectedVideo(location.state.challengeInfo.video)
    setPreviewVideo(location.state.challengeInfo.video)
    setCaption(location.state.challengeInfo.content)
  },[])

  useEffect(() => {
    if (update === true) {
      handlePutAxios()
    }
    return setUpdate(false)
  },[update])

  // AWS 연동
  const ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_ID
  const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_S3_ACCESS_PW
  const REGION = process.env.REACT_APP_AWS_S3_REGION
  const BUCKET = process.env.REACT_APP_AWS_S3_BUCKET

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  })

  const myBucket = new AWS.S3({
    params: {Bucket: BUCKET},
    region: REGION,
  })

  // AWS에 비디오 저장하고 url 가져오기
  const handleVideoUploadToS3 = async () => {
    const replaceFileName = selectedVideo.name.replace(/[^A-Za-z0-9_.-]/g, "");
    const params = {
      ACL: "public-read",
      Body: selectedVideo,
      Bucket: BUCKET,
      Key: uuid() + replaceFileName,
    }

    try {
      await myBucket.putObject(params).promise()
      const S3Url = await handleVideoUrlFromS3(params.Key)
      setSelectedVideo(S3Url)
    } catch (error) {
      console.error(error)
    }
    setUpdate(true)
  }

  // AWS에 비디오 Url 가져오기
  const handleVideoUrlFromS3 = async (Key) => {
    const params = {
      Bucket: BUCKET,
      Key: Key,
    }
    try {
      const videoUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`
      return videoUrl
    } catch (error) {
      console.log(error)
    }
  }

  const handlePutAxios = () => {
    axios
      .put(`${process.env.REACT_APP_API}/api/challenge/${location.state.challengeInfo.id}`, {
        video: selectedVideo,
        content: caption
      },{
        headers: { Authorization: token}
      })
      .then((response) => {
        navigate(`/challenge/${location.state.challengeInfo.id}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleVideoUpload = (e) => {
    // setSelectedVideo(null)
    setPreviewVideo(null)
    
    const videoFile = e.target.files[0];
    setSelectedVideo(videoFile);
    
    const reader = new FileReader();
    if (videoFile) {
      const videoBlob = new Blob([videoFile], { type: videoFile.type });
      reader.readAsDataURL(videoBlob);
      
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(videoFile);
      videoElement.addEventListener("loadedmetadata", () => {
        const durationInSeconds = videoElement.duration;
        if (durationInSeconds > 60) {
          alert("해당 동영상은 1분 이상입니다.");
        } else {
          const videoUrl = URL.createObjectURL(videoFile)
          setSelectedVideo(videoFile)
          setPreviewVideo(videoUrl);
        }
      });
    }
  };
  const handleRemoveVideo = () => {
    setSelectedVideo(null)
    setPreviewVideo(null)
  }

  return (
    <div className="challenge_create">
      <div className="challenge_write_top">
        <ArrowBackIcon sx={{ fontSize: 20 }}className="feed_write_top_back" onClick={() => navigate(-1)}/>
        <h2>Edit Challenge</h2>
        <div 
          className="feed_write_top_upload"
          onClick={handleVideoUploadToS3}
        >upload</div>
      </div>

      <hr className="feed_write_top_header_hr"/>

       {/* challenge 비디오 보여주는 부분 */}
      <div className="feed_write_top_image">
        <div className="feed_write_top_image_upload">
          <label for="fileUpload" className="feed_write_top_image_label">Up load</label>
          <input 
            className="feed_write_top_image_input"
            accept="video/mp4"
            type="file" 
            onChange={handleVideoUpload}
            id="fileUpload"
          />
        </div>

        {challengeInfo ? 
          <div className="challenge_video_wrap">
            {
              previewVideo&&
              <div className="challenge_video_container">
                <video 
                  className="challenge_video_item" 
                  controls 
                >
                  <source src={previewVideo} type="video/mp4" className="challenge_video_item"/>
                </video>
                <button onClick={handleRemoveVideo}>-</button>
              </div>
            }
          </div>
          :
          <div className="challenge_video_wrap"></div>}
      </div>

      {/* feed caption 부분 */}
      <div className="feed_write_mid">
        <textarea
          className="feed_write_mid_caption_textarea"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="문구 입력..."
        />
      </div>
    </div>
  );
}

export default ChallengeEdit;