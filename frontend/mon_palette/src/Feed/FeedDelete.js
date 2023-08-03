import React, { useState } from 'react';
import './FeedDelete.css'
import axios from 'axios'
import { useRecoilValue } from 'recoil';
import { loginState } from './../user/components/Atom';
import AWS from 'aws-sdk'

// 피드 디테일에 이미지 url 담겨 있으니 그 url 이용해서 aws에 삭제 요청 보내기

function FeedDelete() {
  const token = useRecoilValue(loginState)
  const [imageUrlList, setImageUrlList] = useState([])
  const [deleteAWS, setDeleteAWS] = useState(false)
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

  const handleRemoveFeed =(feedId) => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/feed/${feedId}`,{
        headers: { Authorization: token}
      })
      handleGetImageUrl()
      setDeleteAWS(true)
  }
  
  const handleGetImageUrl = async () => {
    await feedData.feedImages.map(imagUrl =>
      setImageUrlList((prev) => [...prev, imagUrl])   
    )
  }

  // aws에 삭제보내는 함수
  const handleRemove = async () => {
    imageUrlList.map(delImgUrl => {
      const fileUrlParts = delImgUrl.split('/')
      const objectKey = decodeURIComponent(fileUrlParts[fileUrlParts.length-1])
      const params = {
        Bucket: BUCKET,
        Key: objectKey
      }

      try {
        myBucket.deleteObject(params)
        console.log('삭제완료')
      } catch (error) {
        console.log('error', error)
      }
    })
  }

  useEffect(() => {
    if (deleteAWS === true) {
      handleRemove()
    }
  },[deleteAWS])

  return (
    <div>
      <button onClick={() => handleRemoveFeed(피드id)}>Delete</button>  
    </div>
  );
}

export default FeedDelete;