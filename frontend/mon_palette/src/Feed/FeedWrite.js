import React, { useState, useEffect } from 'react';
import styles from './FeedWrite.module.css';
import axios from 'axios';
import { loginState } from '../user/components/Atom';

// AWS
import AWS from 'aws-sdk'
import uuid from 'react-uuid'
import { useRecoilValue } from 'recoil';

const FeedWrite = () => {

  const token = useRecoilValue(loginState)

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

  // 이미지 부분
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageUrlList, setImageUrlList] = useState([])
  const [update, setUpdate] = useState(false)

  // feed 설명
  const [caption, setCaption] = useState('');

  // 해시태그 부분
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);

  

  const handleImageUpload = (e) => {
    const files = e.target.files[0]
    if (selectedImages.length > 9) {
      alert('최대 10장까지 등록 가능합니다.')
      document.querySelector("#fileUpload").disabled = true
    } else {
      setSelectedImages((prevImages) => [...prevImages, files]);
    }
  };

  const handleRemoveImage = (imageIndex) => {
    document.querySelector("#fileUpload").disabled = false
    setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== imageIndex));
  };

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

  // AWS로 이미지 저장하기
  const handleCreate = async (imageFileList) => {
    if (selectedImages.length === 0) {
      alert('사진을 선택하세요!!')
      return
    } else if (!caption) {
      alert('내용을 입력하세요!!')
      return
    } else {
      try {
        await Promise.all(
          imageFileList.map(async (imageFile) => {
            const params = {
              ACL: "public-read",
              Body: imageFile,
              Bucket: BUCKET,
              Key: uuid() + imageFile.name,
            };
    
            try {
              const data = await myBucket.putObject(params).promise();
    
              const S3Url = await handleImageUrlFromS3(params.Key);
              setImageUrlList((prev) => [...prev, S3Url]);
            } catch (error) {
              console.log(error);
            }
          })
        )
        setUpdate(true)
      } catch (error) {
        console.log(error);
      }
    }
  };

  // hashTag 부분
  const handleAddTag = () => {
    setTagList((prev) => [...prev, tags])
    setTags('')
  }


  // axios 요청 보내기
  useEffect(() => {
    if (update === true) {
      handlePostFeed()
    }
    setUpdate(false)
  },[update])

  // axios 함수
  const handlePostFeed = () => {
    if (selectedImages.length === 0) {
      alert('이미지를 선택하세요')
    } else if (!caption) {
      alert('설명을 입력하세요')
    } else {
      axios
        .post('http://192.168.30.224:8080/api/feed', {
        content: caption,
        hashtags: tagList,
        feedImages: imageUrlList
        },{
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
  console.log('imageUrlList',imageUrlList)

  return (
    <div className={styles["feed-form"]}>
      <div className={styles.header}>
        <button className={styles.button}>뒤로 가기</button>
        <h2>글 작성하기</h2>
        <button 
          className={styles.button}
          onClick={() => {
            handleCreate(selectedImages)}
          }
        >업로드</button>
      </div>


      {/* feed 이미지 부분 */}
      <div className={styles["feed-image"]}>
        <input 
          accept="image/*"
          multiple
          type="file" 
          onChange={handleImageUpload}
          id="fileUpload"
        />
      
        <div className={styles["selected-images"]}>
          {selectedImages.map((image, index) => (
            <div key={index} className={styles["image-item"]}>
              <img className={styles["feed-img"]} src={URL.createObjectURL(image)} alt={index} />
              <button className={styles["feed-button"]} onClick={() => handleRemoveImage(index)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* feed caption 부분 */}
      <div className={styles.caption}>
        <div className="feed-caption">
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="피드에 추가할 캡션을 입력하세요..."
          />
        </div>
      </div>

      <hr className={styles.hr}/>
      
      {/* feed 해시태그 부분 */}
      <div className={styles.tag}>
        <h2># Tag</h2>
        <textarea 
          className={styles.textarea}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요..." 
        />
        <button className={styles.button} onClick={handleAddTag}>Add Tag</button>

        <div>
          {
            tagList.map((tag, index) => {
              return <div key={index}>#{tag}</div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default FeedWrite;
