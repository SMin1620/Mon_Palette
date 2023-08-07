import React, { useState, useEffect, useRef } from 'react';
import './FeedMain.css'
import axios from 'axios';
import { loginState } from '../user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

function FeedMain() {
  const token = useRecoilValue(loginState);
  const [feedInfo, setFeedInfo] = useState([]);
  const [tagInfo, setTagInfo] = useState([])
  const [feedPage, setFeedPage] = useState(0);
  const [tagState, setTagState] = useState(null);

  // 무한스크롤 구현
  const obsRef = useRef(null);
  const endRef = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    getFeed(); // axios 요청 보내기
    const observer = new IntersectionObserver(handleObs, { threshold: 0.5 }); // 페이지 최초 렌더링시 옵저버 생성

    if (obsRef.current) observer.observe(obsRef.current);
    return () => { observer.disconnect(); }; // 페이지 언마운트시 옵저버 해제
  }, []);

  useEffect(() => {
    if (feedPage !== 0) {
      getFeed();
    }
  }, [feedPage]);

  // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
      // 스크롤 바닥에 도달하면 페이지 번호를 증가시키고 데이터를 가져옴
      setFeedPage((prevPage) => prevPage + 1);
    }
  };

  const getFeed = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/feed?page=${feedPage}`, {
        headers: { Authorization: token }
      });

      setFeedInfo((prevFeedInfo) => [...prevFeedInfo, ...response.data.data.feeds]);
      setTagInfo(response.data.data.tagRanking)
    } catch (error) {
      console.error(error);
    }
  };

  const handleFeedDetail = (feedId) => {
    navigate(`/feed/${feedId}`);
  };
  
  return (
    feedInfo&&<div className="feedMain">
      {/* 해시태그 부분 */}
      <div className="feed_tags_container">
        <div className="feed_tags">
          {tagInfo.map((tag, index) => {
            const keyWordLength = tag.keyword.length
            const tagItemWidth = keyWordLength * 1.5

            return (
              <div className="feed_tag_item" onClick={() => {
                if (tagState && tagState !== tag.keyword) {
                  setTagState(tag.keyword);
                } else {
                  setTagState(null);
                }
              }} key={index} style={{ width: `${tagItemWidth}rem`}}># {tag.keyword}
              </div>
            );
          })}
        </div>
      </div>

      {/* 태그목록만 조회 */}
      <div className="feedMain_body">
        <div className="feedMain_body_info">
          <div className="feedMain_body_container">
            {
            feedInfo&&feedInfo.map((info, index) => {
              return <div className="feedMain_body_info_item" key={index}>
                <div>
                  <img src={info.feedImages[0].imagePath} alt="" onClick={() => handleFeedDetail(info.id)} className="feedMain_body_info_item_top" />

                  <div className="feedMain_body_info_item_bottom">
                    <img src={info.user.profileImage} alt={info.user.name}/>

                    <p>{info.user.nickname}</p>
                  </div>

                </div>
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
