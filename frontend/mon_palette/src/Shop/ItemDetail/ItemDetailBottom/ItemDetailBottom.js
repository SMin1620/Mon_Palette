import React, { useState, useEffect } from "react";
import styles from "./ItemDetailBottom.module.css"
import { HighlightOff as HighlightOffIcon, Clear as ClearIcon } from '@mui/icons-material';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Select from 'react-select'
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';

function ItemDetailBottom () {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemDetailData, setItemDetailData] = useState("")
    const [options, setOptions] = useState([]);
    const [selectedOptionList, setSelectedOptionList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedItems, setSelectedItems] = useState(null);
    const [check, setCheck] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const itemId  = useParams()
    const token = useRecoilValue(loginState)
   

    const navigate = useNavigate()

    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/api/item/detail/${itemId.id}`, {
         headers: { Authorization: token },
        })
        .then ((response) => {
            setItemDetailData(response.data.data)
         // console.log(ItemDetailData);
        })
        .catch ((err) => {
             console.log(err);
        })
     },[])

    useEffect(() => {
        if (itemDetailData) {
            const options =  itemDetailData.itemOptionDtoList.map((option) => ({
                value: option.id,
                label: option.optionName,
                stock: option.stock,
                count: 1
            }));
            setOptions(options);
        }
    }, [itemDetailData]);

    useEffect (()=> {
      if (check) {
        navigate(`/payment`, { state: selectedItems })
      }
    },[check])


    const price = Math.round(itemDetailData.price * ((100 - itemDetailData.discount) * 0.01 ));

    const maximumItem = itemDetailData.maximum
    const [totalCount, setTotalCount] = useState(0)
    

    const handleSelectChange = (selectedOption) => {
      const totalSelectedCount = selectedOptionList.reduce((total, option) => total + option.count, 0);
      const newTotalCount = totalSelectedCount + 1; // 새로운 옵션을 선택했을 때의 total count
      
      if (newTotalCount <= maximumItem) {
          const existingOptionIndex = selectedOptionList.findIndex(
              (option) => option.value === selectedOption.value
          );
          
          if (existingOptionIndex !== -1) {
              // 이미 선택된 옵션이 있는 경우, count를 1 증가
              setSelectedOptionList((prevSelected) => {
                  const newSelected = [...prevSelected];
                  newSelected[existingOptionIndex].count += 1;
                  return newSelected;
              });
          } else {
              // 선택되지 않은 옵션인 경우, count를 1로 설정하고 추가
              setSelectedOptionList((prevSelected) => [
                  ...prevSelected,
                  { ...selectedOption, count: 1 }
              ]);
          }
      } else {
          setShowModal(true); // maximum을 초과하면 모달 표시
      }
  };
  
  

    const handleClearClick = (index) => {
      setSelectedOptionList((prevSelected) => {
          const newSelected = [...prevSelected];
          const option = newSelected[index];

          // 옵션의 count를 0으로 설정하여 선택 해제
          option.count = 0;

          // 옵션의 count가 0인 경우 리스트에서 제거
          if (option.count === 0) {
              newSelected.splice(index, 1);
          }

          return newSelected;
      });
  };


    
    const handleIncrement = (index) => {
      // 총 선택된 옵션들의 개수 합산
      const totalSelectedCount = selectedOptionList.reduce((total, option) => total + option.count, 0);
      
      if (totalSelectedCount + 1 <= maximumItem) {
          setSelectedOptionList((prevSelected) => {
              const newSelected = [...prevSelected];
              newSelected[index].count += 1;
              setTotalCount((prevTotalCount) => prevTotalCount + 1);
              return newSelected;
          });
      } else {
          setShowModal(true);
      }
  };
  

      const handleDecrement = (index) => {
        setSelectedOptionList((prevSelected) => {
          const newSelected = [...prevSelected];
          if (newSelected[index].count > 0) {
            newSelected[index].count -= 1;
            setTotalCount((prevTotalCount) => prevTotalCount - 1);
            if (newSelected[index].count === 0) {
                handleClearClick(index); // If count reaches 0, remove the option
            }
        }
          return newSelected;
        });
      };

      useEffect(() => {
        const newTotalPrice = selectedOptionList.reduce(
            (total, option) => total + option.count * price,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [selectedOptionList, price]);

    const openModal = () => {
         setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const addToCart = () => {
      const cartItemDtoList = selectedOptionList.map((option) => ({
        cartItemId: 0, 
        itemId: itemDetailData.id, 
        name: itemDetailData.name, 
        price: itemDetailData.price, 
        discount: itemDetailData.discount,
        manufact: itemDetailData.manufact, 
        deliveryFee: itemDetailData.deliveryFee, 
        thumbnail: itemDetailData.thumbnail, 
        maximum: itemDetailData.maximum, 
        itemOptionDtoList: [
          {
            itemOptionId: option.value, 
            itemOptionDetailId: option.value, 
            stock: option.stock,
            itemOptionCount: option.count,
          },
        ],
      }));

      const requestBody = { cartItemDtoList };

        axios
        .post(`${process.env.REACT_APP_API}/api/cart/insert`, requestBody, {
            headers: { Authorization: token },
        })
        .then ((response) => {
            console.log(response);
            setSelectedOptionList([]);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addToBuy = () => {
      const buyItemDtoList = selectedOptionList.map((option) => ({
        cartItemId: 0, 
        itemId: itemDetailData.id, 
        name: itemDetailData.name, 
        price: itemDetailData.price, 
        discount: itemDetailData.discount,
        manufact: itemDetailData.manufact, 
        deliveryFee: itemDetailData.deliveryFee, 
        thumbnail: itemDetailData.thumbnail, 
        maximum: itemDetailData.maximum, 
        itemOptionDtoList: [
          {
            itemOptionId: option.value, 
            itemOptionDetailId: option.value, 
            stock: option.stock,
            itemOptionCount: option.count,
          },
        ],
      }));

      setSelectedItems(buyItemDtoList);
      setCheck(true);
      
    
    }

    const closeAlert = () => {
      setShowModal(false);
    }
    


    return (
        <div>
            <div className={styles.btn_container}>
                <button onClick={openModal} className={styles.btn}>Buy</button>
            </div>

            {/* 모달창 */}
          
                <div className={`${styles.modal_background} ${
                    isModalOpen ? styles.modal_open : ''
                }`}>
                    <div className={`${styles.modal_top} ${
                    isModalOpen ? styles.modal_open : ''
                }`}>
                        <div className={styles.close_modal} onClick={closeModal}>
                            <HighlightOffIcon />
                        </div>
                        <div className={styles.modal}>
                            <div>

                            </div>
                            <div className={styles.select_box}>
                                { options && (
                                <Select 
                                options={options}
                                onChange={handleSelectChange}
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderColor: state.isFocused ? 'pink' : 'pink',
                                      boxShadow: state.isFocused ? '0 0 0 2px hotpink' : 'hotpink', // Add boxShadow for focus
                                      '&:hover': {
                                        borderColor: 'pink', 
                                      },
                                    }),
                                    option: (baseStyles, state) => ({
                                      ...baseStyles,
                                      '&:hover': {
                                        backgroundColor: 'pink', // Add background color for hover
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
                                )}
                            </div>
                            <div className={styles.selected}>
                                {
                                    selectedOptionList && (
                                        selectedOptionList.map((option, index) => (
                                            <div key={index} className={styles.selected_option}>
                                                <div className={styles.info}>
                                                    <span className={styles.name}>{option.label} </span>
                                                    
                                                    <span  className={styles.clear} onClick={() => handleClearClick(index)}><ClearIcon/></span>
                                                </div>
                                                <div className={styles.cnt}>
                                                <div className={styles.minus} onClick={() => handleDecrement(index)}>
                                                    <MinusCircleOutlined />
                                                </div>
                                                <div className={styles.count}>
                                                    {option.count}
                                                </div>
                                                <div className={styles.plus} onClick={() => handleIncrement(index)}>
                                                    <PlusCircleOutlined />
                                                </div>
                                                <span className={styles.stock}>(재고: {option.stock})</span>
                                                <div className={styles.price}>
                                                    {((option.count) * (price)).toLocaleString()} ₩
                                                </div>
                                            </div>
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                                <div className={styles.total_price_wrap}>
                                    <div className={styles.total}>
                                        TOTAL
                                    </div>
                                    <div className={styles.total_price}>
                                        {totalPrice.toLocaleString()} ₩
                                    </div>
                                </div>
                                <div className={styles.button_container}>
                                    <div>
                                        <button 
                                        className={styles.modal_btn}
                                        onClick={addToCart} 
                                        type="button">Add to Cart</button>
                                    </div>
                                    <div>
                                        <button 
                                        className={styles.modal_btn}
                                        onClick={addToBuy}
                                        type="button">Buy</button>
                                    </div>
                                </div>
                                
                        </div>
                        { showModal && (
                          <div className={styles.alert_wrap}>
                            <div className={styles.alert}>
                              <div className={styles.container}>
                                <div>
                                {`최대 ${maximumItem}개까지 선택할 수 있습니다.`}
                                </div>
                                <div>
                                  <button
                                  className={styles.alert_btn}
                                  onClick={closeAlert}>확인</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                </div>
    
        </div>
    )

}

export default ItemDetailBottom;

