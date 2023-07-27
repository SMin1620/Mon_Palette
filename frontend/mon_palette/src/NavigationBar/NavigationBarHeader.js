import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './NavigationBarHeader.css'
import { useRecoilState } from 'recoil';
import { modalState } from '../Atom'

import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NavigationBarHeader(props) {
  const [showPage, setShowPage] = useRecoilState(modalState)
  const handleModal = () => {
    setShowPage(!showPage)
  }

  let PageTitle = props.title === 'Mon, Palette'

  return (
    <>
      <div className="navigationBar_header">
        <div className="navigationBar_left">
          {
            PageTitle ? (<MenuIcon sx={{ fontSize: 30 }} onClick={handleModal}/>) : (<ArrowBackIcon className="mordal_back" sx={{ fontSize: 30 }}/>)
          }
        </div>  

        <div className="navigationBar_center">

          <Link to='/'>
            <h3>{props.title}</h3>
          </Link>
        </div>
        
        {
          PageTitle ? (
            <div className="navigationBar_right">
              <div className="navigationBar_right_left">
                <Link to='/search/'>
                  <SearchIcon sx={{ fontSize: 30 }} />
                </Link>
              </div>
    
              <div className="navigationBar_right_right">
                <NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }}/>
              </div>
            </div>) : (<div className="navigationBar_right_none"></div>)
        }
      </div>

      <div className={`page ${showPage ? 'show' : ''}`}>
        <div className="modal_top">
          <div className="modal_left">
            <ArrowBackIcon sx={{ fontSize: 20 }} className="mordal_back" onClick={handleModal} />
          </div>

          <div className="modal_center">
            <h3>category</h3>
          </div>
          {/* space-between 용 의미없는 div 태그 */}
          <div>
          </div>

        </div>
        {/* Function 에 Link 걸기 */}
        <div className="modal_body">
          <h1>Function1</h1>
          <h1>Function2</h1>
          <h1>Function3</h1>
          <h1>Function4</h1>
        </div> 
      </div>
    </>
  );
}

export default NavigationBarHeader
