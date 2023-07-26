import React from 'react';
import './SignUp.css'; // 스타일 파일 임포트
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const handleMoveSignUpFrom = () => {
    navigate('/signupform')
  }   

    return (
      <div className="container">
        <h2>가입 방식을</h2>
        <h2>선택해주세요</h2>
        <div className="button-container">
          <button onClick={handleMoveSignUpFrom} >Sign Up</button>
        </div>
        <div className="horizontal-line-container">
            <hr />
            <p>or</p>
            <hr />
        </div>
        
        <div>
            <SocialLoginButton socialMedia="google" buttonText="Sign Up with Google" />
            <SocialLoginButton socialMedia="kakao" buttonText="Sign Up with Kakao" />
        </div>
      </div>
    );
};

const SocialLoginButton = ({ socialMedia, buttonText }) => {
  const imageSrc = `/static/${socialMedia}.png`; // 소셜 미디어에 따른 이미지 경로 설정

  return (
    <div className="social-login-button-container">
      <button>
        <img src={imageSrc} alt={socialMedia} className="social-media-icon" />
        {buttonText}
      </button>
    </div>
  );
};

export default SignUp;