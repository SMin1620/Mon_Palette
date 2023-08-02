import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios'
import { loginState } from '../user/components/Atom';
import { useRecoilValue } from 'recoil';
import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';


function FeedEdit(props) {
  const navigate = useNavigate()
  // const feedId = useParams()
  // 피드정보 props 받아서 id 값 뽑아오고 해당 id 로 put 요청 보내기
  const feedId = props.feedData.id
  const token = useRecoilValue(loginState)
  const [feedData, setFeedData] = useState('')
  // 프랍받은 이미지 저장하기
  const [propsFeedImages, setPropsFeedImages] = useState([])
  // 유저가 올린 이미지 저장하기
  const [userSelectedImages, setUserSelectedImages] = useState([])
  // AWS에 저장할 이미지
  const [newImages, setNewImages] = useState([]) 
  // AWS에서 삭제할 이미지
  const [deleteImage, setDeleteImage] = useState([])
  // 이미지 url
  const [imageUrlList, setImageUrlList] = useState([])
  // 피드 설명
  const [caption, setCaption] = useState('')
  // 피드 태그
  const [tags, setTags] = useState('')
  const [tagList, setTagList] = useState([])
  // axios 실행시킬 useEffect
  const [update, setUpdate] = useState(false)

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

  // AWS에서 url 가져오기
  const handleImageUrlFromS3 = async (key) => {
    const params = {
      Bucket: BUCKET,
      Key: key,
    };

    try {
      if (params.Key.includes(' ')) {
        const replaceFileName = params.Key.replace(/\s/g,'+')
        console.log(replaceFileName)
        const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${replaceFileName}`
        console.log(imageUrl)
        return imageUrl;
      } else {
        const imageUrl = `https://${BUCKET}.s3.ap-northeast-2.amazonaws.com/${params.Key}`
        console.log(imageUrl)
        return imageUrl
      }
    } catch (error) {
      console.log(error)
      return null
    }
  };

  useEffect(() => {
    // 프랍받은 이미지 넣기 + 복사본 만들기
    props.feedData.feedImages.map(image => {
      setPropsFeedImages((prevImg) => [...prevImg, image])
      setUserSelectedImages((prevImg) => [...prevImg, image])
    })

    // 캡션저장
    setCaption(props.feedData.content)

    // 태그저장
    props.feedData.hashtags.map(hashtag => {
      setTagList((prevtag) => [...prevtag, hashtag])
    })
  },[])


  useEffect(() => {
    if (update === true) {
      axios
        .put(`http://192.168.30.224:8080/api/feed/${feedId}`, {
          content: caption,
          hashtag: tagList,
          feedImages: imageUrlList
        },{
          headers: { Authorization: token}
        })
        .then((response) => {
          console.log(response)
          navigate(-1)
          // 수정된 디테일 페이지롱 이동
        })
        .catch((error) => {
          console.log(error)
        })
      
        handleRemove()
    }
    setUpdate(false)
  },[update])

  const handleImageUpload = (e) => {
    const files = e.target.files[0]
    if (userSelectedImages.length > 9) {
      alert('최대 10장까지 등록 가능합니다.')
      document.querySelector("#fileUpload").disabled = true
    } else {
      setUserSelectedImages((prevImg) => [...prevImg, files])
    }
  }
  
  const handleRemoveImage = (imageIndex) => {
    document.querySelector("#fileUpload").disabled = false
    setUserSelectedImages((prevImg) =>{
      const removedImage = prevImg[imageIndex]
      const updatedImages = prevImg.filter((_, index) => index !== imageIndex)
      setDeleteImage((prevRemovedImage) => [...prevRemovedImage, removedImage])
      return updatedImages
    }) 
  };

  // aws에 삭제보내는 함수
  const handleRemove = async () => {
    const handleDeleteImageList = await deleteImage.filter(delImage => propsFeedImages.includes(delImage))
    handleDeleteImageList.map(delImgUrl => {
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

  // hashTag 부분
  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      setTagList((prev) => [...prev, tags])
      setTags("")
    }
  }

  const handleNewimageList = async () => {
    await setNewImages(
      userSelectedImages.filter(newImage => !propsFeedImages.includes(newImage))
    )
  }

  // 업로드
  const handleUpload = async () => {
    if (userSelectedImages.length === 0) {
      alert("사진을 선택하세요!!")
      return
    } else if (!caption) {
      alert("내용을 입력하세요!!")
      return
    } else {
      await handleNewimageList()
      try {
        await Promise.all(
          newImages.map(async (imageFile) => {
            const params = {
              ACL: "public-read",
              Body: imageFile,
              Bucket: BUCKET,
              Key: uuid() + imageFile.name
            }
            
            try {
              const _temp = await myBucket.putObject(params).promise()
              const S3Url = await handleImageUrlFromS3(params.key)
              setImageUrlList((prev) => [...prev, S3Url])
            } catch (error) {
              console.log(error)
            }
          })
        )
        setUpdate(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="feed_edit">
      <div className="feed_edit_top">
        <ArrowBackIcon sx={{ fontSize: 20 }}className="feed_write_top_back"/>
        <h3>Edit Profile</h3>
        <button onClick={handleUpload}>edit</button>
      </div>

      <hr className="feed_edit_top_header_hr"/>

      <div className="feed_edit_top_image">
        <div className="feed_edit_top_image_upload">
          <label for="fileUpload" className="feed_write_top_image_label">Up load</label>
          <input 
            className="feed_edit_top_image_upload"
            type="file"
            accept="image/*"
            id="fileUpload"
            onChange={handleImageUpload} 
          />
        </div>

        <div className="feed_edit_top_image_wrap">
          {
            userSelectedImages.map((image, index) => {
              return <div key={index} className="feed_edit_top_image_container">
                <img src={image} alt={index}/>
                <button onCliCk={() => handleRemoveImage(index)}>-</button>
              </div>
            })
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
      
      <h2># Tag</h2>
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
            tagList.map((tag, index) => {
              return <div className="feed_write_bottom_hashtag_item" key={index}># {tag}</div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default FeedEdit;