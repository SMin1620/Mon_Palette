import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './NavigationBarHeader.css'
import { useRecoilState } from 'recoil';
import { modalState } from '../Atom'

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NavigationBarHeader() {
  const [showPage, setShowPage] = useRecoilState(modalState)
  const handleModal = () => {
    setShowPage(!showPage)
  }
  return (
    <>
      <div className="navigationBar_header">
        <div className="navigationBar_left">
          <MenuIcon onClick={handleModal}/>
        </div>  

        <div className="navigationBar_center">
          <Link to='/'>
            <h1>Mon, Palette</h1>
          </Link>
        </div>

        <div className="navigationBar_right">
          <div className="navigationBar_right_left">
            <SearchIcon />
          </div>

          <div className="navigationBar_right_right">
            <NotificationsIcon />
          </div>
        </div>
      </div>
      <div className={`page ${showPage ? 'show' : ''}`}>
        <div className="modal_top">
          <div className="modal_left">
            <ArrowBackIcon onClick={handleModal} />
          </div>

          <div className="modal_center">
            <h1>category</h1>
          </div>

          <div>
          </div>

        </div>
        <div className="modal_body">
          <h1>카테고리</h1>
          <h1>카테고리</h1>
          <h1>카테고리</h1>
          <h1>카테고리</h1>
        </div> 
      </div>
    </>
  );
}

export default NavigationBarHeader
