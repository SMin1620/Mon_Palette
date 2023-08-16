import React, { useState, useEffect } from "react";
import styles from "./ItemDetailBottom.module.css"
import { HighlightOff as HighlightOffIcon, Clear as ClearIcon } from '@mui/icons-material';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Select from 'react-select'
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import { useParams } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { selectedOptionsState, RootWithPersistence } from "../../Atom/orderList"

function ItemDetailBottom () {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemDetailData, setItemDetailData] = useState("")
    const [options, setOptions] = useState([]);
    const [selectedOptionList, setSelectedOptionList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const itemId  = useParams()
    const token = useRecoilValue(loginState)
    const [selectedOptions, setSelectedOptions] = useRecoilState(selectedOptionsState);



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

    


    const price = Math.round(itemDetailData.price * ((100 - itemDetailData.discount) * 0.01 ));

    const maximumItem = itemDetailData.maximum
    const [totalCount, setTotalCount] = useState(0)
    

    const handleSelectChange = (selectedOption) => {
        // 기존에 선택된 옵션들의 개수 합산
        const totalSelectedCount = selectedOptions.reduce(
          (total, option) => total + option.count,
          0
        );
      
        // 선택된 옵션의 개수까지 합산하여 최대 재고를 초과하는지 확인
        const newTotalCount = totalSelectedCount + selectedOption.count;
      
        if (newTotalCount <= maximumItem) {
          const existingOptionIndex = selectedOptions.findIndex(
            (option) => option.label === selectedOption.label
          );
      
          if (existingOptionIndex !== -1) {
            // 이미 선택한 옵션이라면 해당 옵션의 개수를 증가시킵니다.
            setSelectedOptions((prevSelectedOptions) => {
              const newSelectedOptions = [...prevSelectedOptions];
              newSelectedOptions[existingOptionIndex].count += selectedOption.count;
              return newSelectedOptions;
            });
          } else {
            // 새로운 옵션을 선택한 경우에는 선택한 옵션을 추가합니다.
            setSelectedOptions((prevSelectedOptions) => [
              ...prevSelectedOptions,
              { label: selectedOption.label, count: selectedOption.count },
            ]);
          }
        } else {
          alert(`최대 ${maximumItem}개까지 선택할 수 있습니다.`);
        }
      };
      
    
    
    


    const handleClearClick = (index) => {
        setSelectedOptionList((prevSelected) => {
            const removedOption = prevSelected[index];
            const newSelected = [...prevSelected];
            setTotalCount((prevTotalCount) => prevTotalCount - removedOption.count);
            newSelected.splice(index, 1);
            return newSelected;
        });
    };
    
    const handleIncrement = (index) => {
        setSelectedOptionList((prevSelected) => {
          const newSelected = [...prevSelected];
          if (newSelected[index].count + 1 <= maximumItem) {
            newSelected[index].count += 1;
            setTotalCount((prevTotalCount) => prevTotalCount + 1);
        } else {
            alert(`최대 ${maximumItem}개까지 선택할 수 있습니다.`);
        }
        return newSelected;
        });
      };

      const handleDecrement = (index) => {
        setSelectedOptionList((prevSelected) => {
          const newSelected = [...prevSelected];
          if (newSelected[index].count > 0) {
            newSelected[index].count -= 1;
            if (newSelected[index].count === 0) {
              handleClearClick(index); // If count reaches 0, remove the option
            }
            setTotalCount((prevTotalCount) => prevTotalCount - 1);
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
        // const cartItems = selectedOptionList.map((option) => {
        //     return {
        //         item: option.label,
        //         itemCnt: option.count,
        //     }
        // })
        axios
        .post(`${process.env.REACT_APP_API}/api/cart`, {
            // cartItems: cartItems,
            item: "립스틱",
            itemCnt: 3
        }, {
            headers: { Authorization: token }
        })
        .then ((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
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
                                // value={selectedOption}
                                onChange={handleSelectChange}
                                // components={{
                                //     Option: CustomOption
                                // }}
                                styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,
                                      borderColor: state.isFocused ? 'pink' : 'pink',
                                      boxShadow: state.isFocused ? '0 0 0 2px hotpink' : 'hotpink', // Add boxShadow for focus
                                      '&:hover': {
                                        borderColor: 'pink', // Add hover style
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
                                        type="button">Buy</button>
                                    </div>
                                </div>
                                
                        </div>
                    </div>
                </div>
    
        </div>
    )

}

export default function ItemDetailWithPersistence(props) {
  return (
    <RootWithPersistence>
      <ItemDetailBottom {...props} />
    </RootWithPersistence>
  );
}