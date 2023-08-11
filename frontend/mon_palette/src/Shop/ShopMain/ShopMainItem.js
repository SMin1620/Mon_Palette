import React, { useState, useEffect, useRef } from 'react';
import "./ShopMainItem.css"
import axios from 'axios';
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { PropagateLoader }  from 'react-spinners';
import { useNavigate } from 'react-router-dom'

function ShopMainItem(props) {
  
  const token = useRecoilValue(loginState)
  const navigate = useNavigate()
  const [categoryItem, setCategoryItem] = useState([])
  const [categoryPage, setCategoryPage] = useState(0)
  const [load, setLoad] = useState(true)

    // 무한스크롤 구현
    const preventRef = useRef(true)
    const obsRef = useRef(null);
    const endRef = useRef(false);

  useEffect(() => {
    if (props.midCategory !== null) {
      setCategoryItem([])
      setCategoryPage(0)
      handleCategoryItem()
      const observer = new IntersectionObserver(handleObs, { threshold: 0.5 }); // 페이지 최초 렌더링시 옵저버 생성
      if (obsRef.current) observer.observe(obsRef.current);
      return () => { observer.disconnect(); }; // 페이지 언마운트시 옵저버 해제
    }
  },[props.midCategory])

  useEffect(() => {
    if (categoryPage !== 0) {
      handleCategoryItem()
    }
  },[categoryPage])
  
    // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
    const handleObs = (entries) => {
      const target = entries[0];
      if (!endRef.current && target.isIntersecting) {
        preventRef.current = false
        // 스크롤 바닥에 도달하면 페이지 번호를 증가시키고 데이터를 가져옴
        setCategoryPage((prevPage) => prevPage + 1);
      }
    };
  
  const handleCategoryItem = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/api/item/category?categoryid=${props.midCategory.id}&page=${categoryPage}`,{
          headers: { Authorization: token }
        })
        .then((response) => {
          console.log(response)
          if (response.data.data.length !== 10) {
            endRef.current = true
            setLoad(false)
            setCategoryItem((prev) => [...prev, ...response.data.data])
          } else {
            setCategoryItem((prev) => [...prev, ...response.data.data])
            preventRef.current = true
          }
        })
    } catch (error) {
      console.error(error)
    }
  }
  
  const handleMoveDetail = (id) => {
    navigate(`/shop/shopdetail/${id}`)
  }

  return (
    <div className="shopMain_item">
      <div className="shopMain_item_wrap">
        {
          categoryItem&&
          <div className="shopMain_item_container">
            {
              categoryItem.map(category => {
                return <div className="shopMain_item_item" key={category.id} onClick={() => handleMoveDetail(category.id)}>
                  <img src={category.thumbnail} alt=""/>
                  <h3>{category.name}</h3>
                  <div className="shopMain_item_item_cost">
                    {
                      category.discount !== 0 ? <h4>{category.discount}%</h4> : null
                    }
                    <h5>{category.price.toLocaleString()}원</h5>
                  </div>
                  <div className="shopMain_item_item_period">
                    <p>기간:</p>
                    <p>{category.createAt.slice(5, 10)}</p>
                    <p>~</p>
                    <p>{category.endAt.slice(5, 10)}</p>
                  </div>
                </div>
              })
            }

          </div>
        }
      </div>

      {/* 이부분이 보이면 ref로 무한 스크롤 구현 */}
      {
        load ? 
        <div className="observer_spinner" ref={obsRef}>
          <PropagateLoader color='#fdf2f7'/>
        </div>
        :
        <div
          className="observer_last_data"
          ref={obsRef}
        >Last Page</div>
      }

    </div>
  );
}

export default ShopMainItem;