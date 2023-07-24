import React from 'react';
import './NavigationBarBottom.css'


import HomeIcon from '@mui/icons-material/Home';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function NavigationBarBottom() {
  return (
    <div className="navigationbar_bottom">
      <div className="nav_bottom_challenge">
        <FireIcon />
      </div>

      <div className="nav_bottom_feed">
        <PhotoSizeSelectActualIcon/>
      </div>

      <div className="nav_bottom_home">
        <HomeIcon />
      </div>

      <div className="nav_bottom_shop">
        <LocalMallIcon />
      </div>

      <div className="nav_bottom_myPage">
        <AccountCircleIcon />
      </div>

    </div>
  );
}

export default NavigationBarBottom;