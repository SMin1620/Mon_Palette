import React, { useState, useEffect } from 'react';
import "./ShopMain.css"
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import ShopMainCategory from './ShopMainCategory';
import ShopMainItem from './ShopMainItem';
import axios from 'axios';

function ShopMain() {
  const token = useRecoilValue(loginState)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCategory, setModalCategory] = useState(null)
  const [categoryState, setCategoryState] = useState(null)
  const [largeCategory, setLargeCategory] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/category/all`, {
        headers: { Authorization: token }
      })
      .then((response) => {
        console.log(response)
        // setLargeCategory((prev) => [...prev, ...response.data.data[0].children])
      })
  },[])

  const handleOpenCategory = (category) => {
    if (modalOpen === false) {
      setModalOpen(true)
      setCategoryState(category.name)
      setModalCategory(category.children)
    }
    if (modalOpen === true) {
      if (categoryState === category.name) {
        setModalOpen(false)
        setCategoryState(null)
        setModalCategory(null)
      } else {
        setCategoryState(category.name)
        setModalCategory(category.children)
      }
    }
  }

  return (
    <div className="shop_main">
      <div className="shop_main_top">
        <div className="shop_main_top_container">
        {
          largeCategory.map((category) => 
            <div className="shop_main_top_item" key={category.index} onClick={() => handleOpenCategory(category)}>
              <img src={category.categoryPhoto} alt="" />
              <p>{category.name}</p>
            </div>
          )
        }
        </div>
        </div>
        {
          modalOpen&&<ShopMainCategory categoryName={modalCategory} />
        }
        </div>
  );
}

export default ShopMain;