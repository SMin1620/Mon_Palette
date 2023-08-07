import React from 'react';
import styles from './SearchResultUser.module.css';
import { useNavigate } from 'react-router-dom';

const SearchResultUser = ({ data, onUserClick }) => {
    const navigate = useNavigate();
    const handleUserClick = (id) => {
        navigate(`/userpage/${id}`);
      };
    return (
        <div>
            {data.user.map((userdata, index)=>{
                return <div key={index} onClick={() => handleUserClick(userdata.id)}>
                    <img src={userdata.profileImage} />
                    <div> {userdata.nickname} </div>
                </div>
            })}
        </div>
    )
};

export default SearchResultUser;