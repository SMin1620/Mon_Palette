import React from 'react';
import './ChallengeHome.css'
// import FollowChallenge from './FollowChallenge'

function ChallengeHome() {

  // 받아온 challengeuser 정보
  const FollowUserImage = [
    {
      id: '1',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'jsw'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '2',
      user: {
        userId: 'email정보',
        userImg: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg',
        userNicname: 'jsww'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '3',
      user: {
        userId: 'email정보',
        userImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s',
        userNicname: 'choijs'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '4',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'joej'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '5',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'kys'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '6',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'ksm'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    },
    {
      id: '7',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'osv'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      },
    },
    {
      id: '8',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'lsm'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      },
    },
    {
      id: '9',
      user: {
        userId: 'email정보',
        userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
        userNicname: 'asdfqweras'
      },
      challenge: {
        challengeId: 'challenge번호',
        challengeComment: '챌린지 이름',
        challengeVideo: '유저가 올린 챌린지 비디오 정보'
      }
    }
  ]

  const PopularChallengeImage = [
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
  ]

const AllChallengeImage = [
  'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
]


  return (
    <div className="challengeHome">
      <div className="challengeHome_top">
        <div className="challengeHome_top_container">
          {
            FollowUserImage.map((followUserInfo) => {
              // console.log(followUserInfo)
              // axios 로 받아온 정보들에서 데이터 타입 맞춰서 이미지 넣어주기
              // 받아올 때 내가 팔로우한 유저 정보 전체를 받아옴
              // 클릭하면 해당 유저가 올린 챌린지 디테일로 이동
              // 다시 여기 돌아오면 스크롤 위치 이동 및 이전에 이미 클릭한 유저는 opacity 로 그라데이션 블랙 투명도 낮은거 배경으로 넣어서 diable 처럼 보이게 하기
              
              return <div className="challengeHome_top_image_item" key={followUserInfo.id}>
                <img src={followUserInfo.user.userImg} alt={followUserInfo.id} />
                <p>{followUserInfo.user.userNicname}{}</p>
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
              PopularChallengeImage.map((challengeImage, index) => {
                return <div className="challengeHome_mid_image_item" key={index}>
                  <img src={challengeImage} alt="" />
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
                AllChallengeImage.map((challengeInfo, index) => {
                  return <div className="challengeHome_bottom_info_item" key={index}>
                    <img src={challengeInfo} alt="" />
                    {index}

                  </div>
                })
              }
            </div>
        </div>

      </div>

    </div>
  );
}

export default ChallengeHome;