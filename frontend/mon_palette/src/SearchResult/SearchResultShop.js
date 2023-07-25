import React from 'react';
import './SearchResultShop.css'

function SearchResultShop() {
  const Data = [{
    title: '가짜제목',
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    imgSrc: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=996&t=st=1690267153~exp=1690267753~hmac=ce53bc8b87bfeb06776cc17f93e58ca92a6cbcb3ffd4104e48c830dac4ebe296',
    user: 'jsw',
    personalColor: '봄 웜톤'
  },{
    title: '가짜제목',
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    imgSrc: 'https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?w=740&t=st=1690267653~exp=1690268253~hmac=4ed1c8f68737892b9a227aa96d13e41daae696d8e2b01b8fc63e35c501383b95',
    user: 'jsw',
    personalColor: '봄 웜톤'
  },{
    title: '가짜제목',
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    imgSrc: 'https://img.freepik.com/free-photo/the-red-or-white-cat-i-on-white-studio_155003-13189.jpg?w=740&t=st=1690267653~exp=1690268253~hmac=4ed1c8f68737892b9a227aa96d13e41daae696d8e2b01b8fc63e35c501383b95',
    user: 'jsw',
    personalColor: '봄 웜톤'
  },{
    title: '가짜제목',
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    imgSrc: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=996&t=st=1690267153~exp=1690267753~hmac=ce53bc8b87bfeb06776cc17f93e58ca92a6cbcb3ffd4104e48c830dac4ebe296',
    user: 'jsw',
    personalColor: '봄 웜톤'
  },]
  return (
    <div className="search_result_shop_wrap">
      <div className="search_result_shop_container">
        {
          Data.map((data, index) => {
            return <div className="search_result_shop_item" key={index}>
              <img src={data.imgSrc} alt=""/>
              <p>{data.title}</p>
              <p>{data.description}</p>
              <p>{data.user}</p>
              <p>{data.personalColor}</p>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default SearchResultShop;