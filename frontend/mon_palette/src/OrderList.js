import React, { useState, useEffect } from 'react';
import "./OrderList.css"
import { useRecoilValue } from 'recoil';
import { loginState } from './user/components/Atom/loginState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const info = [
  {
    id: 1,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 2,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 3,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 5,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 7,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 888,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
  {
    id: 9,
    itemImage: "https://www.converse.co.kr/web/product/extra/big/202307/5093a4b5977ca65cb5ab40123e07f4f4.jpg",
    itemName: "컨버스 아더에러",
    itemOption: {
      color: "white",
      size: 260
    },
    price:100000,
    count: 2,
    orderAt: "2023-08-07T10:07:58.350436"
  },
]

function OrderList() {

  const token = useRecoilValue(loginState)
  const navigate = useNavigate()
  const [myOrderList, setMyOrderList] = useState([])
  

  // useEffect(() => {
  //   handleGetItem()
  // },[myOrderList])

  useEffect(() => {
    handleGetItem()
  },[])

  // 주문조회
  const handleGetItem = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/order`, {
        headers: { Authorization: token }
      })
      .then((response) => {
        console.log(response)
        setMyOrderList(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 주문 상세페이지 이동
  const handleOrderDetail = (id) => {
    navigate(`/order/${id}`)
  }

  // 주문취소
  const handleDeleteOrder = (id) => {
    axios
      .put(`${process.env.REACT_APP_API}/api/order/${id}`,{}, {
        headers: { Authorization: token }
      })
      .then((response) => {
        console.log(response)
        setMyOrderList([])
        handleGetItem()
      })
  }

  return (
    <div className="order_list">
      <div className="order_list_wrap">
        {
          myOrderList&&myOrderList.map(item => {
            return <div className="order_list_item" key={item.id}>
              <div className="order_list_item_top">
                <h4 className="order_list_item_orderAt">{item.orderAt.slice(0,10)}일 주문</h4>

                <button onClick={() => handleOrderDetail(item.id)}>주문 상세보기 > </button>
              </div>

              <div className="order_list_item_body">
                <div className="order_list_item_body_info">
                  <div className="order_list_item_body_info_wrap">
                    <div>
                      <p className="order_list_item_body_info_requirements_title">요구사항</p>
                      <p className="order_list_item_body_info_requirements">{item.requirement}</p>
                    </div>
                    {
                      item.orderStatus === "ORDER" ? 
                      <p className="order_list_item_sucess">주문접수</p>
                      :
                      <p className="order_list_item_cancle">주문취소</p>
                    }
                  </div>

                  <div className="order_list_item_body_info_cost_wrap">
                    <p>결제금액</p>
                    <p className="order_list_item_body_info_cost">{item.price.toLocaleString()} 원</p>
                  </div>
                </div>

                <button className={item.orderStatus === "ORDER" ? "abled_button" : "disabled_button"}
                  onClick={() => handleDeleteOrder(item.id)}
                  disabled={
                    item.orderStatus === "CANCLE"
                  }
                >주문취소</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default OrderList;