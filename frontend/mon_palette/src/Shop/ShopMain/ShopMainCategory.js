import React, { useState, useEffect } from 'react';
import ShopMainItem from './ShopMainItem';
import './ShopMainCategory.css'

function ShopMainCategory(props) {
  const [categoryState, setCategoryState] = useState("")
  const [midCategory, setMidCategory] = useState(null)
  const [propCategory, setPropCatogory] = useState(null)
  const [classState, setClassState] = useState(false)

  useEffect(() => {
    setCategoryState(props.categoryName)
  },[props.categoryName])

  const handleProp = (category) => {
    setMidCategory(category.name)
    setPropCatogory(category)
    if (midCategory !== category.name) {
      setClassState(true)
    }
  }

  return (
    <div className="shopMain_category">
      <div className="shopMain_category_container">
      {
        categoryState&&categoryState.map((category) => {
          return <div 
            key={category.id} 
            onClick={() => handleProp(category)}
            className={classState&&midCategory === category.name ? "shopMain_category_item_on" :"shopMain_category_item_off"}
          >{category.name}</div>  
        })
      }
      </div>
      <ShopMainItem midCategory={propCategory} categoryName={midCategory}/>
    </div>
  );
}

export default ShopMainCategory;
