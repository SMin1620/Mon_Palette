import React from 'react';
import ProfileImage from './ProfilePicture';
import styles from "./ProfileImage.css";

const UserProfile = () => {
  const imageUrl = '경로/프로필_이미지.jpg';
  const altText = '프로필 이미지';

  return (
    <div>
      <ProfileImage imageUrl={imageUrl} altText={altText} />
      {/* 기타 프로필 정보 및 요소들을 추가할 수 있음 */}
    </div>
  );
};

export default UserProfile;
