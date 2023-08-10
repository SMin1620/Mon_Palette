import React from 'react';
import './ChallengeHome.css'

function ChallengeHome() {
  return (
    <div className="challengeHome">
      <div className="challengeHome_top">
        동그라미로 유저정보의 이미지 보여주기 슬라이드 형식으로
      </div>

      <div className="challengeHome_mid">
        <div className="challenge_mid_label">
          <h3>Popular challenge</h3>
          <button>more</button>
        </div>
        <div className="challengeHome_mid_challengeImg">
          이미지 보여줄거
        </div>
      </div>

      <div className="challengeHome_bottom">
        진행중인 챌린지 불러와서 보여줄거
      </div>

    </div>
  );
}

export default ChallengeHome;