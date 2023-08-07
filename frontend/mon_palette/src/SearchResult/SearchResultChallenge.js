import React from 'react';
import axios from 'axios';
import styles from './SearchResult.module.css'
import { useNavigate } from 'react-router-dom';

const SearchResultChallenge = ({ data }) => {
  const navigate = useNavigate();
  const handleChallengeClick = (id) => {
    navigate(`/challenge/${id}`);
  };
  return (
    <div>
      {data.user && data.user.length > 0 && data.user.map((userdata, index)=>{
        return <div key={index} onClick={() => handleChallengeClick(userdata.id)}>
          <video src={userdata.video} />
        </div>
      })}
    </div>
  );
}

export default SearchResultChallenge;
