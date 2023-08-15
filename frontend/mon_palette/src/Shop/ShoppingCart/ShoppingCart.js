import React, { useState, useEffect } from 'react';
import "./ShoppingCart.css"

const data = [
  {
    id: 1,
    made: "나이키",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 260,
      color: "white",
    },
    price: 130000,
  },
  {
    id: 2,
    made: "아디다스",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 260,
      color: "white",
    },
    price: 170000,
  },
  {
    id: 3,
    made: "퓨마",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 280,
      color: "black",
    },
    price: 150000,
  },
  {
    id: 11,
    made: "나이키",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 245,
      color: "Flat white",
    },
    price: 168000,
  },
  {
    id: 13,
    made: "나이키",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 245,
      color: "Flat white",
    },
    price: 168000,
  },
  {
    id: 15,
    made: "나이키",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 245,
      color: "Flat white",
    },
    price: 168000,
  },
  {
    id: 12,
    made: "나이키",
    itemImage: "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F07%2Fabout-the-release-of-the-second-adidas-x-converse-collection-01.jpg?cbr=1&q=90",
    itemName: "컨버스 X 아더에라 콜라보",
    option: {
      size: 245,
      color: "Flat white",
    },
    price: 168000,
  },
]

function ShoppingCart() {

  const [checkedItem, setCheckedItem] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  useEffect(() => {
    setProductPrice([])
    checkedItem.map(product => {
      setProductPrice((prev) => [...prev, product.price])
    })
  },[checkedItem])

  useEffect(() => {
    if (productPrice.length !== 0) {
      const totalPrice = productPrice.reduce((total, current) => total + current)
      setTotalCost(totalPrice)
    } else {
      setTotalCost(0)
    }
  },[productPrice])

  // 체크박스 단일선택
  const handleCheckItem = (checked, product) => {
    if (checked) {
      setCheckedItem((prev) => [...prev, product])
    } else {
      setCheckedItem(checkedItem.filter((item) => item !== product))
    }
  }

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      const idArray = []
      data.forEach((product) => idArray.push(product))
      setCheckedItem(idArray)
    }
    else {
      setCheckedItem([]);
    }
  }

  // data 부분은 useRecoilValue 로 읽어온 장바구니 전체값
  return (
    <div className="shoppingCart_main">
      <div className="shoppingCart_main_top">
        <input 
          type="checkbox" 
          id="check1"
          className="shoppingCart_checkbox"
          onChange={(event) => handleAllCheck(event.target.checked)}
          checked={checkedItem.length === data.length ? true : false}
        />
        <p>전체 {data.length}개</p>
      </div>

      <div className="shoppingCart_main_body_wrap">
        {
          data&&data.map(product => {
            return <div className="shoppingCart_main_body" key={product.id}>
              <input 
                type="checkbox"
                className="shoppingCart_checkbox"
                id="check1"
                onChange={(event) => handleCheckItem(event.target.checked, product)}
                checked={(checkedItem.includes(product) ? true : false)}
              />

              <div className="shoppingCart_main_body_item">
                <div className="shoppingCart_main_body_left">
                  <img src={product.itemImage} alt={product.id}/>
                </div>

                <div className="shoppingCart_main_body_rigth">
                  <div className="shoppingCart_main_body_rigth_top">
                    <div className="shoppingCart_main_body_explain">
                      <p>{product.made}</p>
                      <p>{product.itemName}</p>
                      <p>
                        <span>{product.option.size}</span>
                        <span> | </span>
                        <span>{product.option.color}</span>
                      </p>
                    </div>

                    <div>
                      <button className="shoppingCart_main_body_remove">X</button>
                    </div>
                  </div>

                  <div className="shoppingCart_main_body_rigth_bottom">
                    <button className="shoppingCart_main_bottom_option">옵션/수량</button>
                    <p>{product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          })
        }
      </div>

      <div className="shoppingCart_main_bottom_pay">
        <h3 className="shoppingCart_main_bottom_pay_title">
          결제할 상품 <span>총 {checkedItem.length}개</span>
        </h3>
        <button className="shoppingCart_main_bottom_pay_button">
          <span>총 {checkedItem.length}개 | </span>{totalCost}원 결제하기
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;