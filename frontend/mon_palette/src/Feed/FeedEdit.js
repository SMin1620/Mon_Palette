import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams, useLocation} from 'react-router-dom';
import './FeedEdit.css'


function FeedEdit(props) {
  const navigate = useNavigate()
  const location = useLocation()
  const feedId = useParams()
  const token = useRecoilValue(loginState)

  // location 데이터 저장하기
  const [feedData, setFeedData] = useState('')

  useEffect (() => {
    setFeedData(location.state.feedData)
  },[])

  // location 데이터 저장하기
  const [feedImages, setFeedImages] = useState([])
  const [caption, setCaption] = useState('')
  const [tagList, setTagList] = useState([])
  const [tags, setTags] = useState('')

  useEffect(() => {  
    feedData&&feedData.feedImages.map(image => {
      setFeedImages((prevImg) => [...prevImg, image.imagePath])
      setCaption(feedData.content)
    })
    feedData&&feedData.hashtags.map(hashtag => {
      setTagList((prevtag) => [...prevtag, hashtag])
    })
  },[feedData])
  
  // AWS 통신하며 이미지 저장
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

  const handleImageUpload = (e) => {
    const files = e.target.files[0]
    if (!files) {
      setFeedImages(feedImages)
    } else {
      // AWS에 저장 후 url 가져와서 다시 저장
      handleImageUploadToS3(files)
    }
  }

  // AWS 에서 URL 가져오기
  const handleImageUrlFromS3 = async (key) => {
    const params = {
      Bucket: BUCKET,
      Key: key
    }
    try {
      const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`
      return imageUrl
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // AWS에 이미지 저장 및 URL 리스트에 저장
  const handleImageUploadToS3 = async (imageFile) => {
    const replaceFileName = imageFile.name.replace(/[^A-Za-z0-9_.-]/g, "");    
    const params = {
      ACL: "public-read",
      Body: imageFile,
      Bucket: BUCKET,
      Key: uuid() + replaceFileName
    }
    try {
      const _temp = await myBucket.putObject(params).promise()
      const S3Url = await handleImageUrlFromS3(params.Key)
      setFeedImages((prev) => [...prev, S3Url])
    } catch (error) {
      console.log(error)
    }
  }

  // 이미지 삭제 
  const handleRemoveImage = (imageIndex) => {
    document.querySelector("#fileUpload").disabled = false
    setFeedImages((prevImg) => prevImg.filter((_, index) => index !== imageIndex))
  }

  // hashTag 부분
  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      const replaceTag = tags.replace(/\s/g,"")
      if(replaceTag==="") {
        alert("빈값입니다.")
      } else {
        setTagList((prev) => [...prev, replaceTag])
        setTags("")
      }
    }
  }

  const handleRemoveHashTag = (tagindex) => {
    setTagList((prev) => prev.filter((_, index) => index !== tagindex))
  }

  const handleUpload = () => {
    axios
      .put(`${process.env.REACT_APP_API}/api/feed/${feedId.id}`, {
        content: caption,
        hashtags: tagList,
        feedImages: feedImages
      }, {
        headers: {Authorization: token}
      })
      .then((response) => {
        console.log(response)
        window.location.href = `/feed/${feedId.id}`;
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className="feed_edit">
      <div className="feed_edit_top">
        <ArrowBackIcon sx={{ fontSize: 20 }}className="feed_write_top_back"/>
        <h2>Edit feed</h2>
        <div onClick={handleUpload} className="feed_edit_top_upload">edit</div>
      </div>

      <div className="feed_edit_top_image">
        <div className="feed_edit_top_image_upload">
          <label for="fileUpload" className="feed_edit_top_image_label">Select Image</label>
          <input 
            className="feed_edit_top_image_input"
            type="file"
            accept="image/*"
            id="fileUpload"
            onChange={handleImageUpload} 
            multiple
          />
        </div>

        <div className="feed_edit_top_image_wrap">
          {
            feedImages&&feedImages.map((image, index) => (
              <div key={index} className="feed_edit_top_image_container">
                <div className="feed_edit_top_image_item">
                  <img src={image} alt={index}/>
                  <button onClick={() => handleRemoveImage(index)}>-</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div className="feed_edit_mid">
        <textarea 
          className="feed_edit_mid_caption_textarea"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>

      <hr className="feed_edit_mid_bottom_hr"/>
      
      <h2 className="feed_edit_bottom_h2"># Tag</h2>
      <div className="feed_edit_bottom">
        <textarea 
          className="feed_edit_bottom_hashtag_textarea"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="# 단어를 입력해서 나만의 tag를 만들어보세요!"
          maxLength={20}
          onKeyUp={handleAddTag}
        />

        <div className="feed_write_bottom_hashtag_area">
          {
            tagList&&tagList.map((tag, index) => {
              return <div className="feed_write_bottom_hashtag_item" key={index}># {tag}

              <button className="feed_edit_bottom_hashtag_button" onClick={() => handleRemoveHashTag(index)}>-</button>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default FeedEdit;