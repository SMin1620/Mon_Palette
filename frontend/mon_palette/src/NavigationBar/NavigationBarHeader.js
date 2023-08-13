import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './NavigationBarHeader.css'

// 아이콘
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function NavigationBarHeader(props) {
  const navigate = useNavigate()
  const [showPage, setShowPage] = useState(false)
  const handleModal = () => { setShowPage(!showPage) }
  const handlePageBack = () => { navigate(-1) }
  
  let PageTitle = props.title
  console.log(props.item)
  let PageCenter = true
  let PageLeft = true

  if (PageTitle === 'Mon, Palette') {
    PageCenter = true;
    PageLeft = true;

  } else if (PageTitle === 'login') {
    PageCenter = false;
    PageLeft = false;
  } else {
    PageCenter = false;
    PageLeft = true;
  }

  const handleCart = () => {
    navigate("/cart")
  }
  

  return (
    <>
      <div className="navigationBar_header">
        <div className="navigationBar_left">
          {
            PageCenter ? (<MenuIcon sx={{ fontSize: 30 }} onClick={handleModal}/>) : PageLeft ? ((<ArrowBackIcon onClick={handlePageBack} className="mordal_back" sx={{ fontSize: 30 }}/>)) : (<div></div>)
          }
        </div>  

        <div className="navigationBar_center">
          <h3>{props.title}</h3>
        </div>
        
        {
          PageCenter ? (
            <div className="navigationBar_right">
              <div className="navigationBar_right_left">
                <Link to='/search/'>
                  <SearchIcon sx={{ fontSize: 30 }} />
                </Link>
              </div>
              
              {
                props.item==="shop" ? 
                <div className="navigationBar_right_right">
                  <ShoppingCartOutlinedIcon sx={{fontSize: 30}} onClick={handleCart}/>
                </div>
                :
                <div className="navigationBar_right_right">
                  <NotificationsNoneOutlinedIcon sx={{ fontSize: 30 }}/>
                </div>
              }
            </div>
            ) 
            :
            (<div className="navigationBar_right_none"></div>)
        }
      </div>

      <div className={`page ${showPage ? 'show' : ''}`}>
        <div className="modal_top">
          <div className="modal_left">
            <ArrowBackIcon sx={{ fontSize: 30 }} className="mordal_back" onClick={handleModal} />
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
          <div className="modal_body_item">
            <Link to="/AImakeup">AI MakeUp</Link>
          </div>

          <div className="modal_body_item">
            <Link to="/AImakeup">YouTuber</Link>
          </div>

          <div className="modal_body_item">
            <Link to="/AImakeup">My Palette</Link>
          </div>

          <div className="modal_body_item">
            <Link to="/personalcolor">Color Test</Link>
          </div>
        </div> 

        <div className="modal_bottom">
          {/* <SettingsOutlinedIcon sx={{ fontSize: 30}} className="modal_bottom_settings" /> */}
          <LogoutOutlinedIcon sx={{ fontSize: 30}} className="modal_bottom_logout" />
        </div>
      </div>
    </>
  );
}

export default NavigationBarHeader
