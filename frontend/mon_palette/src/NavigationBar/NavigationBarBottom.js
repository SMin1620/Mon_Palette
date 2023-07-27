import React from 'react';
import './NavigationBarBottom.css'
import { Link } from 'react-router-dom';


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import PhotoSizeIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



function NavigationBarBottom() {
  return (
    <div className="navigationbar_bottom">
      
      <div className="nav_bottom_icons">
        <Link to="/challenge">
          <FireIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons">
        <Link to="/feed/">
          <PhotoSizeIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons">
        <Link>
          <HomeOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons">
        <Link>
          <LocalMallOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons">
        <Link>
          <PermIdentityOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBarBottom;