import React from 'react'

const ProfileImage = ({ imageUrl, altText }) => {
    return (
      <div className="profile-picture">
        <img src={imageUrl} alt={altText} />
      </div>
    );
  };
  
  export default ProfileImage;