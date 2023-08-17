import React, { useState, useEffect } from 'react';
import "./DeliveryList.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loginState } from './user/components/Atom/loginState';

const info = 
[
  {
    id: 1,
    userName: "정수완",
    phone: "01026595557",
    addressNumber: 12345,
    address: "부산 서구 초장동 43-6",
    addressDetail: "신화헤라 502호",
    baseAddress: true
  },
  {
    id: 2,
    userName: "김예슬",
    phone: "01012341234",
    addressNumber: 23456,
    address: "부산 강서구 명지대방디엠시티",
    addressDetail: "0동 000호",
    baseAddress: false
  },
  {
    id: 3,
    userName: "조은정",
    phone: "01056785678",
    addressNumber: 34567,
    address: "부산 강서구 명지오션시티",
    addressDetail: "0동 000호",
    baseAddress: false
  },
]



function DeliveryList() {
  
  const token = useRecoilValue(loginState)
  const navigate = useNavigate()
  const [address, setAddress] = useState([])
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    // handleGetAddress()
  },[])

  useEffect(() => {
    if (update === true) {
      handleGetAddress()
    }
    setUpdate(false)
  },[update])
  
  const handleSetBaseAddress = (id) => {
    console.log(id)
    // 이 id 값으로 axios 요청 보내서 기본배송지 설정
  }

  // 배송지 조회
  const handleGetAddress = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/address`, {
        headers: { Authorization: token }
      })
      .then((response) => {
        setAddress(response.data)
        update(false)
      })
  }

  // 배송지 수정
  const handleEditAddress = (id, delivery) => {
    navigate(`/delivery/edit/${id}`, {
      state: {deliveryInfo: delivery}})
  }

  // 배송지 삭제
  const handleDeleteAddress = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/address/${id}`,{
        headers: { Authorization: token }
      })
      .then(() => {
        setUpdate(true)
      })
  }

  return (
    <div className="deliveryList">
      {/* 기본배송지로 설정되면 제일위로 표시되게 설정 */}
      <div className="deliveryList_top_base_list">
        {
          info.map(delivery => {
            if (delivery.baseAddress) {
              return <div 
              className="deliveryList_top_baseList_container"
              key={delivery.id}
              >
              <div className="deliveryList_top_baseList_user_info">
                <div>
                  <span>{delivery.userName}</span>
                  <span> | </span>
                  <span>{delivery.phone.slice(0,3)}</span>
                  <span>-</span>
                  <span>{delivery.phone.slice(3,7)}</span>
                  <span>-</span>
                  <span>{delivery.phone.slice(7)}</span>
                </div>

                <div className="deliveryList_top_baseList_baseAddress">
                  기본배송지
                </div>
              </div>
  
              <div className="deliveryList_top_baseList_address_info">
                {/* 주소 3개로 나눴는데 굳이..? */}
                <span>({delivery.addressNumber})</span>
                <span>{delivery.address}</span>
                <p>{delivery.addressDetail}</p>
              </div>
  
              <div className="deliveryList_top_baseList_button">
                <button onClick={() => handleEditAddress(delivery.id, delivery)}>수정</button>
                <button onClick={() => handleDeleteAddress(delivery.id)}>삭제</button>
              </div>
            </div>
            }
          })
        }
      </div>

      {/* 기본배송지가 아닌곳들 */}
      <div className="deliveryList_top_another_list">
        {
          info.map(delivery => {
            if (delivery.baseAddress === false) {
              return <div 
              className="deliveryList_top_another_list_container"
              key={delivery.id}
              >
              <div className="deliveryList_top_baseList_user_info">
                <span>{delivery.userName}</span>
                <span> | </span>
                <span>{delivery.phone.slice(0,3)}</span>
                <span>-</span>
                <span>{delivery.phone.slice(3,7)}</span>
                <span>-</span>
                <span>{delivery.phone.slice(7)}</span>
              </div>
  
              <div className="deliveryList_top_baseList_address_info">
                {/* 주소 3개로 나눴는데 굳이..? */}
                <span>({delivery.addressNumber})</span>
                <span>{delivery.address}</span>
                <p>{delivery.addressDetail}</p>
              </div>
              
              <div className="deliveryList_top_baseList_button">
                <button onClick={() => handleEditAddress(delivery.id, delivery)}>수정</button>
                <button onClick={() => handleDeleteAddress(delivery.id)}>삭제</button>
                <button 
                  onClick={() => handleSetBaseAddress(delivery.id)}
                >기본 배송지로 설정</button>
              </div>
            </div>
            }
          })
        }
      </div>

      <div className="delivery_bottom_add_address">
        <button onClick={() => navigate("/deliveryregist")}>+</button>
      </div>
    </div>
  );
}

export default DeliveryList;