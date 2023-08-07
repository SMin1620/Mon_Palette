import React from 'react';
import styles from './SearchResultUser.module.css';

const SearchResultUser = ({ data }) => {
    return (
        <div>
            {data.user.map((userdata, index)=>{
                return <div key={index}>
                    <img src={userdata.profileImage} />
                    <div> {userdata.nickname} </div>
                </div>
            })}
        </div>
    )
};

export default SearchResultUser;