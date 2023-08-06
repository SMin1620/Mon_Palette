import React, { useState, useEffect } from 'react';
import './ChallengeDetail.css'
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from './../user/components/Atom/loginState';
import { userId } from './../user/components/Atom/UserId';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Modal from './../Modal/Modal';

function ChallengeDetail() {
  const token = useRecoilValue(loginState)
  const currentUser = useRecoilValue(userId)
  const {challengeId} = useParams()
  const [challengeInfo, setChallengeInfo] = useState("")
  const [challengeLike, setChallengeLike] = useState(challengeInfo.isLiked)
  const [buttonText, setButtonText] = useState("팔로우")
  const [modalState, setModalState] = useState(false)
  const navigate = useNavigate()
  console.log(challengeId)

  useEffect(() => {
    handleChallengeDetail()
  },[challengeLike, buttonText])

  const handleModal = () => {
    setModalState(!modalState)
  }

  const handleChallengeDetail = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/challenge/${challengeId}`, {
        headers: { Authorization: token }
      })
      .then((response) => {
        console.log(response)
        setChallengeInfo(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const likedChallenge = () => {
    axios
      .post(`${process.env.REACT_APP_API}/api/challenge/${challengeId}/like`,{}, {
        headers: { Authorization: token}
      })
      .then((response) => {
        setChallengeLike(response.data.data)
        setChallengeInfo(prevChallengeInfo => ({
          ...prevChallengeInfo,
          likeCount: prevChallengeInfo.likeCount +1
        }))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const unLickedChallenge = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/challenge/${challengeId}/like`, {
        headers: { Authorization: token}
      })
      .then((response) => {
        setChallengeLike(response.data.data)
        setChallengeInfo(prevChallengeInfo => ({
          ...prevChallengeInfo,
          likeCount: prevChallengeInfo.likeCount -1
        }))
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleFollow = () => {
    axios
      .post(`${process.env.REACT_APP_API}/api/follow/${challengeInfo.user.id}`,{},
      {
        headers: { Authorization: token}
      })
      .then((response) => {
        if (response.data.data === "팔로우 성공") {
          setButtonText("팔로우취소");
        } else {
          setButtonText("팔로우");
        }
      })
  }

  const handleDeleteChallenge = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/challenge/${challengeId}`,{},
      {
        headers: { Authorization: token }
      })
      .then((response) => {
        navigate('/challenge')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleEditChallenge = () => {
    navigate(`/challenge/edit/${challengeId}`, {
      state: {challengeInfo: challengeInfo}
    })
  }

  return (
    challengeInfo&&<div className="challenge_detail">
      <div className="challenge_detail_top">
        <ArrowBackIcon sx={{fontSize: 20}} className="challenge_detail_back"/>
        <h2>Challenge</h2>
        {
          currentUser === challengeInfo.user.id ?
          <div className="challenge_detail_top_temp onClick={handleModal}">
            ...
          </div>
          :
          <div className="challenge_detail_top_temp"></div>  
        }
      </div>

      <div className={`challenge_detail_modal${modalState ? 'modal_open' : ''}`}>
        <button 
          className="challenge_detail_modal_button" 
          onClick={handleEditChallenge}>
            edit challenge
          </button>
        <button 
          className="challenge_detail_modal_button" 
          onClick={handleDeleteChallenge}>
            delete challenge
          </button>
      </div>

      <div className="challenge_detail_user">
        <div className="challenge_detail_user_info">
          <img src={challengeInfo.user.profileImage} alt={challengeInfo.user.name}/>
          <div className="challenge_detail_user_namebox">
            <p className="challenge_detail_user_nickname">
              {challengeInfo.user.nickname}
            </p>
            <p className="challenge_detail_user_personal_color">
              {challengeInfo.user.personalColor}
            </p>
          </div>
        </div>
        <div className="challenge_detail_follow">
          <button onClick={handleFollow}>{buttonText}</button>
        </div>
      </div>
      <div className="challenge_detail_video">
        <video className="challenge_detail_video_item" autoPlay muted controls>
          <source src={challengeInfo.video} type="video/mp4"/>
        </video>
      </div>
      <div className="challenge_detail_bottom">
        <div className="challenge_detail_bottom_likeInfo">
          <div className="challenge_detail_bottom_isLiked">
            {
              challengeInfo.isLiked ? 
              <FavoriteIcon sx={{fontSize: 30}} onClick={() => unLickedChallenge()} className="challenge_detail_bottom_liked"/> 
              : 
              <FavoriteBorderOutlinedIcon sx={{fontSize: 30}} onClick={() => likedChallenge()} className="challenge_detail_bottom_liked"/>
            }
          </div>
          <div className="challenge_detail_bottom_likeCount">
            {challengeInfo.likeCount}
          </div>
        </div>
      </div>

      <div className="challenge_detail_bottom_content">
        <div className="challenge_detail_comment">
          {challengeInfo.content}
        </div>
      </div>
    </div>
  );
}

export default ChallengeDetail;