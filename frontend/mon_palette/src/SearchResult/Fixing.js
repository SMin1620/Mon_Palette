import React, { useState, useEffect, useRef, Fragment } from 'react';
import './ChallengeHome.css'
import { useRecoilValue } from 'recoil';
import { loginState } from './../user/components/Atom/loginState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChallengeHome({data}) {
  console.log(data)

  const token = useRecoilValue(loginState)
  const [challengeList, setChallengeList] = useState([])
  const [followChallenge, setFollowChallenge] = useState([])
  const [popularChallenge, setPopularChallenge] = useState([])
  const [challengePage, setChallengePage] = useState(0)
  
  // 무한스크롤 구현
  const obsRef = useRef(null);
  const endRef = useRef(false);

  const navigate = useNavigate()

  useEffect(() => {
    getChallenge()
    getPopularChallenge()
    const observer = new IntersectionObserver(handleObs, { threshold: 0.5 }); // 페이지 최초 렌더링시 옵저버 생성
    if (obsRef.current) observer.observe(obsRef.current);
    return () => { observer.disconnect(); }; // 페이지 언마운트시 옵저버 해제
  },[])

  useEffect(() => {
    if (challengePage !== 0) {
      getChallenge()
    }
  },[challengePage])

  // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
      // 스크롤 바닥에 도달하면 페이지 번호를 증가시키고 데이터를 가져옴
      setChallengePage((prevPage) => prevPage + 1);
    }
  };

  const getChallenge = async () => {
    try {
      await axios
      .get(`${process.env.REACT_APP_API}/api/challenge?page=${challengePage}`, {
        headers: {Authorization: token}
      })
      .then((response) => {
        setChallengeList((prevChallenge) =>[...prevChallenge, ...response.data.data])
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getPopularChallenge = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/api/challenge/best`, {
          headers: { Authorization: token}
        })
        .then((response) => {
          setPopularChallenge((prevChallenge) =>[...prevChallenge, ...response.data.data])
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChallengeDetail = (id) => {
    navigate(`/challenge/${id}`)
  }

  return (
    <div className="challengeHome">
      <div className="challengeHome_top">
        <div className="challengeHome_top_container">
          {
            followChallenge&&followChallenge.map((challengeInfo) => {
              return <div className="challengeHome_top_image_item" key={challengeInfo.id} onClick={() => handleChallengeDetail(challengeInfo.id)}>
                <img src={challengeInfo.user.profileImage} alt={challengeInfo.id} />
                <p>{challengeInfo.user.nickname}</p>
              </div>
            })
          }
        </div>
      </div>

      <div className="challengeHome_mid">
        <div className="challenge_mid_label">
          <h3>Popular challenge</h3>
          <button>more</button>
        </div>
        <div className="challengeHome_mid_challengeImg">
          <div className="challengeHome_mid_container">
            {
              popularChallenge&&popularChallenge.map((challengeInfo, index) => {
                return <div className="challengeHome_mid_image_item" key={index} onClick={()=>handleChallengeDetail(challengeInfo.id)}>
                  <video src={challengeInfo.video} alt="" />
                </div>
              })
            }
          </div>
        </div>
      </div>

      <div className="challengeHome_bottom">
        <div className="challengeHome_bottom_label">
          <h3>Challenge</h3>
        </div>
        
        <div className="challengeHome_bottom_challengeInfo">
            <div className="challengeHome_bottom_container">
              {
                challengeList&&challengeList.map((challengeInfo, index) => {
                  return <div className="challengeHome_bottom_info_item" key={index} onClick={() => handleChallengeDetail(challengeInfo.id)}>
                    <video src={challengeInfo.video} alt="" />
                    {index}

                  </div>
                })
              }
            </div>
        </div>
        {data.challenge && data.challenge.length > 0 && (
        <Fragment>
          <div className="challengeHome_search_results">
            {data.challenge.map((challengeInfo, index) => (
              <div key={index} onClick={() => handleChallengeDetail(challengeInfo.id)}>
                <video src={challengeInfo.video} />
              </div>
            ))}
          </div>
        </Fragment>
      )}

      </div>
      
      {/* 이부분이 보이면 ref로 무한 스크롤 구현 */}
      <div className="" ref={obsRef}>
        옵저버
      </div>

    </div>
  );
}

export default ChallengeHome;