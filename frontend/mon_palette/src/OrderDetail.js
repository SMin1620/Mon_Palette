import React, { useState, useEffect } from 'react';
import "./OrderDetail.css"
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './user/components/Atom/loginState';
import axios from 'axios';

function OrderDetail() {
  const token = useRecoilValue(loginState)
  const [orderDetailItem, setOrderDetailItem] = useState()

  useEffect(() => {
    handleOrderDetail()
  },[])

  const handleOrderDetail = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/order/${id.id}`, {
        headers:  { Authorization:token }
      })
      .then((response) => {
        console.log(response)
        setOrderDetailItem(response.data.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }
  console.log(orderDetailItem)

  const id = useParams()
  console.log(id)
  return (
    orderDetailItem&&
    <div className="OrderDetail">  
      <div className="OrderDetail_top">
        <div className="OrderDetail_top_delivery_status">
          <p>{orderDetailItem.orderAt.slice(0, 10)} 주문</p>
          { 
            orderDetailItem.orderStatus === "ORDER" ? 
            <div>
              {
                orderDetailItem.delivery.deliveryStatus === "READY" ?
              <p className="status_ready">배송준비 완료</p>
              :
              <p className="status_complete">배송 완료</p>
              }
            </div>
            :
            <p className="order_list_item_cancle">주문취소</p>
          }
        </div>
        <div className="OrderDetail_top_delivery">
          {/* 받는사람, 우편번호, 주소, 연락처 순 */}
          <p className="OrderDetail_top_delivery_receiver">{orderDetailItem.delivery.receiver}</p>
          <span className="OrderDetail_top_delivery_other">({orderDetailItem.delivery.zipcode})</span>
          <span className="OrderDetail_top_delivery_other">{orderDetailItem.delivery.address}</span>
          <p className="OrderDetail_top_delivery_other">{orderDetailItem.delivery.phone}</p>
        </div>
      </div>

      <div className="OrderDetail_mid">
        {
          orderDetailItem.items.map(item => (
            <div key={item.itemId} className="OrderDetail_mid_wrap">
              <div className="OrderDetail_mid_item">
                <p className="OrderDetail_mid_item_cost_info">결제 정보</p>
                <div>
                  <div className="OrderDetail_mid_item_cost">
                    <span>상품 가격</span>
                    <span>{orderDetailItem.price.toLocaleString()} 원</span>
                  </div>
                  <div className="OrderDetail_mid_item_cost">
                    <span>주문 가격</span>
                    <span>{item.orderPrice.toLocaleString()} 원</span>
                  </div>
                  <div className="OrderDetail_mid_item_cost_total">
                    <p>총 결제금액</p>
                    <p>{orderDetailItem.price.toLocaleString()} 원</p>
                  </div>
                </div>
              </div>

              <div className="OrderDetail_mid_item_option_wrap">
                <h3>옵션정보</h3>
                {
                  item.orderItemOptions.map(option => (
                    <div className="OrderDetail_mid_item_option_container" key={option.itemOptionId}>
                      <img src={option.thumbnail} alt={option.optionName}/>

                      <div className="OrderDetail_mid_item_option_body">
                        <h4>{option.optionName}</h4>
                        <span>{option.orderPrice.toLocaleString()} 원</span>
                        <span> | </span>
                        <span>{option.orderCount} 개</span>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>

        
      
    </div>
  );
}

export default OrderDetail;