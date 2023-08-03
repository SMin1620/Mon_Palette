import React, { useState, useEffect} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRecoilValue } from 'recoil';
import { loginState } from '../user/components/Atom/loginState';


function ChallengeCreate() {
  const token = useRecoilValue(loginState)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [previewVideo, setPreviewVideo] = useState(null)

  const handleVideoUpload = (e) => {
    const videoFile = e.target.files[0]
    setSelectedVideo(videoFile)
  
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewVideo(reader.result)
    }
    if (selectedVideo) {
      reader.readAsDataURL(selectedVideo)
    }
  }









  return (
    <div className="challenge_create">
      <div className="feed_write_top">
        <ArrowBackIcon sx={{ fontSize: 20 }}className="feed_write_top_back"/>
        <h2>write</h2>
        <div 
          className="feed_write_top_upload"
          // onClick={() => {
          //   // handleCreate(selectedImages)}
          // }
        >upload</div>
      </div>

      <hr className="feed_write_top_header_hr"/>


      {/* feed 이미지 부분 */}
      <div className="feed_write_top_image">
        <div className="feed_write_top_image_upload">
          <label for="fileUpload" className="feed_write_top_image_label">Up load</label>
          <input 
            className="feed_write_top_image_input"
            accept="video/mp4"
            multiple
            type="file" 
            onChange={handleVideoUpload}
            id="fileUpload"
          />
          {
            previewVideo && (
              <div>
                <video>
                  <source src={previewVideo} type={selectedVideo.type}/>
                </video>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ChallengeCreate;