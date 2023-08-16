import React, { useState, useEffect } from 'react';
import "./ShoppingCart.css"
import { loginState } from 'src/user/components/Atom/loginState';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HighlightOff as HighlightOffIcon, Clear as ClearIcon } from '@mui/icons-material';
import Select from 'react-select'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

function ShoppingCart() {
  const dummydata = [
    {
      cartItemId: 1,
      thumbnail: "",
      manufact: "나이키",
      name: "에어포스 1",
      itemId: 1,
      itemOptionDtoList: [
        {
          itemOptionId: 1,
          itemOptionCount: 1,
          itemOptionName: "레드"
        },
      ],
      price: 100000,
      discount: 10,
      maximum: 5,
    }
  ]

  const dummyOption = {
    maximum: 5,
    price: 10000,
    itemOptionDtoList: [
      {
        "id": 1604,
        "optionName": "레드",
        "stock": 100
      },
      {
        "id": 1605,
        "optionName": "오렌지",
        "stock": 100
      }
    ],
  }
  

  const token = useRecoilValue(loginState)
  const navigate = useNavigate()

  const [cartItem, setCartItem] = useState([])
  const [checkedItem, setCheckedItem] = useState([])
  const [productPrice, setProductPrice] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [detailItem, setDetailItem] = useState(null)
  // 모달창 관련
  const [modalState, setModalState] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const [optionTotalPrice, setOptionTotalPrice] = useState(0)

  useEffect(() => {
    handleGetData()
  },[])

  // 전체 장바구니 데이터 받아오기
  const handleGetData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/api/cart`, {
        headers: { Authorization: token }
      })
      .then((response) => {
        setCartItem(response.data.data.cartItemDtoList)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  // 장바구니에 수정요청
  const handlePutData = () => {
    axios
      .put(`${process.env.REACT_APP_API}/api/cart`)
  }

  // 받아온 데이터에서 가격만 뽑기
  useEffect(() => {
    setProductPrice([])
    checkedItem.map(product => {
      setProductPrice((prev) => [...prev, product.price])
    })
  },[checkedItem])

  // 총 가격 계산
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
      cartItem.forEach((product) => idArray.push(product))
      setCheckedItem(idArray)
    }
    else {
      setCheckedItem([]);
    }
  }

  // 옵션 수량 변경
  const handleEditOption = (itemId, itemOption) => {
    console.log(itemOption)
    setSelectedOptionList(itemOption)
    itemOption.map(option => {
      setTotalCount(prev => prev + option.itemOptionCount)
    })
    // 아이템 디테일로 get요청
    // axios
    //   .get(`${process.env.REACT_APP_API}/api/item/detail/${itemId}`, {
    //     headers: { Authorization: token }
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     setDetailItem(response.data.data)
    //     setModalState(true)
    //   })
    setModalState(true)
  }
  console.log(selectedOptionList)


  useEffect(() => {
    if (detailItem) {
      setModalState(true)
    }
  },[detailItem])

  let options = dummyOption.itemOptionDtoList.map((option) => ({
    value: option.id,
    label: option.optionName,
    stock: option.stock,
    count: 1
}))

  let maximumItem = dummyOption.maximum
  let price = dummyOption.price

  const handleSelectChange = (selectedValue) => {
    const newTotalCount = totalCount + selectedValue.count;

    if (newTotalCount > maximumItem) {
    alert(`최대 ${maximumItem}개까지 선택할 수 있습니다.`);
    return;
  }
  setTotalCount(newTotalCount);

  const existingOptionIndex = selectedOptionList.findIndex(
    (option) => option.itemOptionId === selectedValue.value
  );

  if (existingOptionIndex !== -1) {
    handleIncrement(existingOptionIndex);
  } else {
    const selectedOption = {
      itemOptionId: selectedValue.value,
      itemOptionCount: selectedValue.count,
      itemOptionName: selectedValue.label,
      itemOptionStock: selectedValue.stock
    }
    setSelectedOptionList((prevSelected) => [...prevSelected, selectedOption]);
  }
  };

  const handleClearClick = (index) => {
    setSelectedOptionList((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected.splice(index, 1);
      return newSelected;
    })
  }

  const handleIncrement = (index) => {
    if (totalCount < maximumItem) {
      setSelectedOptionList((prevSelected) => {
        const newSelected = [...prevSelected];
        newSelected[index].itemOptionCount += 1;
        return newSelected;
      });
      setTotalCount(totalCount + 1)
    } else {
      alert(`최대 ${maximumItem}개까지 선택할 수 있습니다.`);
    }
  };

  const handleDecrement = (index) => {
    setSelectedOptionList((prevSelected) => {
      const newSelected = [...prevSelected];
      if (newSelected[index].itemOptionCount > 0) {
        newSelected[index].itemOptionCount -= 1;
        if (newSelected[index].itemOptionCount === 0) {
          handleClearClick(index); // If count reaches 0, remove the option
        }
      }
      return newSelected;
    });
    setTotalCount(totalCount - 1)
  };

  useEffect(() => {
    const newTotalPrice = selectedOptionList.reduce(
        (total, option) => total + option.itemOptionCount * price,
        0
    );
    setOptionTotalPrice(newTotalPrice);
  }, [selectedOptionList, price]);










  // 장바구니 아이템 단일 삭제
  const handleRemoveItem = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API}/api/cart/${id}`,{
        headers: { Authorization: token}
      })
      .then(() => {
        handleGetData()
      })
      .catch((error) => {
        console.error(error)
      })  
  }

  // 결제창으로 넘어가기
  const handlePay = () => {
    if (checkedItem.length === 0) {
      alert("결제할 상품을 선택하세요!")
    } else {
      navigate("/payment", {
        state: checkedItem
      })
    }
  }

  const closeModal = () => {
    setModalState(false)
  }

  return (
    <div className="shoppingCart_main">
      <div className="shoppingCart_main_top">
        <input 
          type="checkbox" 
          id="check1"
          className="shoppingCart_checkbox"
          onChange={(event) => handleAllCheck(event.target.checked)}
          checked={checkedItem.length === cartItem.length ? true : false}
        />
        <p>전체 {cartItem.length}개</p>
      </div>

      <div className="shoppingCart_main_body_wrap">
        {
          dummydata&&dummydata.map(product => {
            return <div className="shoppingCart_main_body" key={product.cartItemid}>
              <input 
                type="checkbox"
                className="shoppingCart_checkbox"
                id="check1"
                onChange={(event) => handleCheckItem(event.target.checked, product)}
                checked={(checkedItem.includes(product) ? true : false)}
              />

              <div className="shoppingCart_main_body_item">
                <div className="shoppingCart_main_body_left">
                  <img src={product.thumbnail} alt={product.itemId}/>
                </div>

                <div className="shoppingCart_main_body_rigth">
                  <div className="shoppingCart_main_body_rigth_top">
                    <div className="shoppingCart_main_body_explain">
                      <p>{product.manufact}</p>
                      <p className="shoppingCart_main_body_explain_item_name">{product.name}</p>
                      {
                        product.itemOptionDtoList.map(option => (
                          <p key={option.itemOptionId} className="shoppingCart_main_body_option">
                            <span>수량 {option.itemOptionCount}개</span>
                            <span> | </span>
                            <span>{option.itemOptionName}</span>
                          </p>
                      ))
                      }
                    </div>

                    <div>
                      <button 
                        className="shoppingCart_main_body_remove"
                        onClick={() => handleRemoveItem(product.cartItemId)}
                      >X</button>
                    </div>
                  </div>

                  <div className="shoppingCart_main_body_rigth_bottom">
                    <button className="shoppingCart_main_bottom_option" onClick={() => handleEditOption(product.itemId, product.itemOptionDtoList)}>옵션/수량</button>
                    <div>
                      {
                        product.discount !== 0 ? <div>
                          <p 
                            className="shoppingCart_main_body_price"
                          >{product.price.toLocaleString()}원</p>
                          <p className="shoppingCart_main_body_discount_price">
                            {
                            (product.price - ((product.discount / 100) * product.price)).toLocaleString()
                            }원
                            </p>
                        </div> : 
                        <p>{product.price.toLocaleString()}원</p>
                      }

                    </div>
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
        <button 
          className="shoppingCart_main_bottom_pay_button"
          onClick={handlePay}
        >
          <span>총 {checkedItem.length}개 | </span>{totalCost.toLocaleString()}원 결제하기
        </button>
      </div>
      
      {/* 모달창 */}
      <div className={`shoppingCart_modal_background ${modalState ? 'modal_open' : ''}`}>
        <div className={`shoppingCart_modal_top ${modalState ? 'modal_open' : ''}`}>
          <div className="shoppingCart_modal_close" onClick={closeModal}>
            <HighlightOffIcon />
          </div>

          <div className="shoppingCart_modal_body">
            <div></div>

            <div className="shoppingCart_modal_body_select_box">
              <Select 
                options={options}
                onChange={handleSelectChange}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'pink' : 'pink',
                    boxShadow: state.isFocused ? '0 0 0 2px hotpink' : 'hotpink', 
                    '&:hover': {
                      borderColor: 'pink', 
                    },
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    '&:hover': {
                      backgroundColor: 'pink', 
                    },
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 5,
                  colors: {
                    ...theme.colors,
                    primary25: 'neutral30',
                    primary: 'hotpink',
                  }
                })}
              />
            </div>

            <div className="shoppingCart_modal_body_selected">
              {
                selectedOptionList && (
                  selectedOptionList.map((option, index) => {
                    return <div key={option.itemOptionId} className="shoppingCart_modal_body_selected_option">
                      <div
                        className="shoppingCart_modal_body_selected_option_item"
                      >
                        <span className="shoppingCart_modal_body_option_name">{option.itemOptionName}</span>
                        <span className="shoppingCart_modal_body_option_clear" onClick={() => handleClearClick(index)}><ClearIcon/></span>
                      </div>

                      <div className="shoppingCart_modal_body_count">
                        <div className="shoppingCart_modal_body_minus" onClick={() => handleDecrement(index)}>
                          <MinusCircleOutlined/>
                        </div>
                        <div className="shoppingCart_modal_body_count_body">
                          {option.itemOptionCount}
                        </div>
                        <div className="shoppingCart_modal_body_plus" onClick={() => handleIncrement(index)}>
                          <PlusCircleOutlined/>
                        </div>
                        <span className="shoppingCart_modal_body_stock">
                          (재고: {option.itemOptionStock})
                        </span>
                        <div className="shoppingCart_modal_body_price">
                          {((option.itemOptionCount) * (price)).toLocaleString()} ₩
                        </div>
                      </div>
                    </div>
                  })
                )
              }
            </div>

            <div className="shoppingCart_modal_total_container">
              <div className="shoppingCart_modal_total_price_wrap">
                <div className="shoppingCart_modal_total">
                  TOTAL
                </div>
                <div className="shoppingCart_modal_total_price">
                  {optionTotalPrice.toLocaleString()} ₩
                </div>
              </div>

              <div className="shoppingCart_modal_total_price_button_wrap">
                <button onClick={handlePutData}>Edit Option</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;