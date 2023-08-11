import React, { useState, useEffect } from 'react';
import "./ShopMain.css"
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import ShopMainCategory from './ShopMainCategory';
import ShopMainItem from './ShopMainItem';
import axios from 'axios';
import { useNavigate } from 'react-router';

function ShopMain() {
  const token = useRecoilValue(loginState)
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalCategory, setModalCategory] = useState(null)
  const [categoryState, setCategoryState] = useState(null)
  const [largeCategory, setLargeCategory] = useState([])
  const [allItem, setAllItem] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    handleGetCategory()
    handleGetAllItem()
  },[])

  const handleGetAllItem = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/api/item?page=0`, {
          headers: { Authorization: token }
        })
        .then((response) => {
          setAllItem(response.data.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetCategory = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/api/category/all`, {
          headers: { Authorization: token }
        })
        .then((response) => {
          console.log(response)
          setLargeCategory((prev) => [...prev, ...response.data.data[0].children])
        })
    } catch (error) {
      console.error(error)
    }
  }

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
  const handleMoveDetail = (id) => {
    navigate(`/shop/shopdetail/${id}`)
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
          modalOpen&&modalOpen ? <ShopMainCategory categoryName={modalCategory} />
          :
          <div>

          
          <h3>Recent Item</h3>
          <div className="shopMain_container">
            {
              allItem.map(item => {
                return <div className="shopMain_item_item" key={item.id} onClick={() => handleMoveDetail(item.id)}>
                      <img src={item.thumbnail} alt=""/>
                      <h3>{item.name}</h3>
                      <div className="shopMain_item_item_cost">
                        {
                          item.discount !== 0 ? <h4>{item.discount}%</h4> : null
                        }
                        <h5>{item.price.toLocaleString()}원</h5>
                      </div>
                      <div className="shopMain_item_item_period">
                        <p>기간:</p>
                        <p>{item.createAt.slice(5, 10)}</p>
                        <p>~</p>
                        <p>{item.endAt.slice(5, 10)}</p>
                      </div>
                    </div>
              })
            }
          </div>
          </div>
          
        }
        </div>
  );
}

export default ShopMain;