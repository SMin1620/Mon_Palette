import React, { useState ,useEffect } from 'react';
import './FollowChallenge.css'
import axios from 'axios';

import { loginState } from "../user/components/Atom";
import { useRecoilState ,useRecoilValue } from 'recoil';
import { isClickedChallenge } from './Atom';
import { FollowChallengeList } from './Atom';
import { useNavigate } from 'react-router-dom';

function FollowChallenge() {
  const [FollowUserChallenge, setFollowUserChallenge] = useRecoilState(FollowChallengeList)
  const Authorization = useRecoilValue(loginState);

  const [challenge, setChallenge] = useState('')
  const [ClickedChallenge, setClickedChallenge] = useRecoilState(isClickedChallenge)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('http://192.168.30.130:8080/', {
				headers: { Authorization: loginState },
      })
      .then((response) => {
        console.log(response)
        // 응답받은 데이터 setFollowUserChallenge 넣어주기
      })
  },[])

  const handleFollowChallengeDetail = (challengeInfo) => {
    setChallenge(challengeInfo)
    setClickedChallenge([...ClickedChallenge, challenge])
    // navigate() 링크로 챌린지 디테일 페이지로 이동
  }

  return (
    <div>
      <div className="folloChallenge_wrap">
        <div className="folloChallenge_container">
          {
            FollowUserChallenge.map((profileImage, index) => {
              // 다시 여기 돌아오면 스크롤 위치 이동 및 이전에 이미 클릭한 유저는 opacity 로 그라데이션 블랙 투명도 낮은거 배경으로 넣어서 diable 처럼 보이게 하기
              
              return <div className="folloChallenge_item" key={index}>
                <img src={profileImage} alt="" onClick={(challenge) => handleFollowChallengeDetail(challenge)}/>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default FollowChallenge;