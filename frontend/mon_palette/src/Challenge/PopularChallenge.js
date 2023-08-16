import React, { useEffect, useState } from 'react';
import './PopularChallenge.css'
import axios from 'axios';
import { loginState } from './../user/components/Atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PopularChallengeList } from './Atom';








function PopularChallenge() {
  const [popularChallenge, setPopularChallenge] = useRecoilState(PopularChallengeList)




  useEffect(() => {
    axios
    .get('http://192.168.30.130:8080/', {
      headers: { Authorization: loginState },
    })
    .then((response) => {
      console.log(response)
      // setPopularChallenge 로 저장
    })
  },[])





  return (
  <div className="popularChallenge">
    <div className="popularChallenge_label">
      <h3>Popular challenge</h3>
        <button>more</button>
    </div>

    <div className="popularChallenge_wrap">
      <div className="popularChallenge_container">
        {
          popularChallenge.map((challengeImage, index) => {
            return <div className="popularChallenge_item" key={index}>
              <img src={challengeImage} alt="" />
            </div>
          })
        }
      </div>
    </div>
</div>
  );
}

export default PopularChallenge;