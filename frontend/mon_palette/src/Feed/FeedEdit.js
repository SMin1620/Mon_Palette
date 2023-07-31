import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios'
import { loginState } from '../user/components/Atom';
import { useRecoilValue } from 'recoil';
import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import { ArrowBackIcon } from '@mui/icons-material/ArrowBack';


function FeedEdit(props) {
  // const feedId = useParams()
  const feedId = props.feedData.id
  const token = useRecoilValue(loginState)
  const [feedData, setFeedData] = useState('')

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

  useEffect(() => {
    axios
      .put(`http://192.168.30.224:8080/api/feed/${feedId}`)
  },[])




  return (
    <div className="feedEdit">
      <div className="feedEdit_top">
        <ArrowBackIcon />
        <h3>Edit Profile</h3>
        <button>upload</button>
      </div>

      <div className="feedEdit_feedimages">
        <input 
          className="feedEdit_imageUpload"
          type="file"
          accept="image/*"
          id="fileUpload"
          onChange={handleImageUpload} 
        />

        <div className="feedEdit_editImages">
          {
            props.feedData
          }
        </div>

      </div>

      <div className="feedEdit_content">


      </div>

      <div className="feedEdit_hashtag">


      </div>
    </div>
  );
}

export default FeedEdit;