import React, { useState, useEffect, useRef } from 'react';
import FeedTag from './FeedTag'
import './FeedMain.css'
import axios from 'axios';
import { loginState } from '../user/components/Atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

function FeedMain() {
  const token = useRecoilValue(loginState)
  const [feedInfo, setFeedInfo] = useState([])
  const [feedPage, setFeedPage] = useState(0)

  // 무한스크롤 구현
  const preventRef = useRef(true)
  const obsRef = useRef(null)
  const endRef = useRef(false)

  const navigate = useNavigate()
  useEffect(() => {
    if (feedPage !== 0) {
      getFeed()
    }
  },[feedPage])

  useEffect(() => {
    getFeed() // axios 요청 보내기
    const observer = new IntersectionObserver(handleObs, { threshold : 0.5}) // 페이지 최초 렌더링시 옵저버 생성

    if (obsRef.current) observer.observe(obsRef.current)
    return () => {observer.disconnect()} // 페이지 언마운트시 옵저버 해제
  },[])

  // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
  const handleObs = ((entries) => {
    const target = entries[0]
    if (!endRef.current && target.isIntersecting && preventRef.current) { 
      preventRef.current = false // 옵저버 중복 실행 방지 
      setFeedPage(prev => prev + 1)
    }
  })

  const getFeed = async () => {
    await axios
    .get(`${process.env.REACT_APP_API}/api/feed?page=${feedPage}&type=feed`,{
      headers: {Authorization: token}
    })
    .then((response) => {
      setFeedInfo(response.data.data)
      preventRef.current = true
    })
    .catch((error) => {
      console.error(error)
    })
  }

  const handleFeedDetail = (feedId) => {
    navigate(`/feed/:${feedId}`)
  }

  return (
    <div className="feedMain">
      <FeedTag hashTags={feedInfo&&feedInfo}/>
      <div className="feedMain_body">
        <div className="feedMain_body_info">
            <div className="feedMain_body_container">
              {
                feedInfo&& feedInfo.map((info, index) => {
                  return <div className="feedMain_body_info_item" key={index}>
                    <img src={info.feedImages[0].imagePath} alt="" onClick={() => handleFeedDetail(info.id)} />
                  </div>
                })
              }
            </div>
        </div>
      </div>
      {/* 이부분이 보이면 ref로 무한 스크롤 구현 */}
      <div className="" ref={obsRef}>
        옵저버
      </div>
    </div>
  );
}

export default FeedMain;