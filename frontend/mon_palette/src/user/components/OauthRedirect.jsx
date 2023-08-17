import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { loginState } from './Atom/loginState';
import { userId } from './Atom/UserId';
import { isOAuth } from './Atom/isOAuth';
import { useRecoilValue, useRecoilState } from 'recoil';

function OauthRedirect() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [token, setToken] = useRecoilState(loginState)
  const [customerId, setCoutomerId] = useRecoilState(userId)
  const [isoauth, setIsOauth] = useRecoilState(isOAuth)

  useEffect(()=>{
    searchParams && setCoutomerId(searchParams.get('userId'));
    searchParams && setToken(searchParams.get('accessToken'));
    setIsOauth(true);
  },[searchParams])
  
  useEffect(() => {
    if (token&&customerId) {
      navigate("/home")
    }
  },[token, customerId]) 

  return (
    <div>
      
    </div>
  );
}

export default OauthRedirect;