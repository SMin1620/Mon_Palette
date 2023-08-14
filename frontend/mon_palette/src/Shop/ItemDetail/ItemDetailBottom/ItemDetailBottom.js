import React, { useState, useEffect } from "react";
import styles from "./ItemDetailBottom.module.css"
import { HighlightOff as HighlightOffIcon, Clear as ClearIcon } from '@mui/icons-material';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Select from 'react-select'
import axios from "axios";
import { logDOM } from "@testing-library/react";

function ItemDetailBottom () {

    const [isModalOpen, setIsModalOpen] = useState(false); 
    // const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionList, setSelectedOptionList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    


    const ItemDetailData = {
        "thumbnail": "https://pbs.twimg.com/media/EZLMS90VcAUXk-z.jpg:large",
        "id": 1603,
        "name": "롬앤 틴트",
        "content": "롬앤 * 산리오 콜라보 상품이에요! 우와앙아아앙 다들 환영해주세요!!",
        "manufact": "롬앤",
        "deliveryFee": "Free",
        "maximum": 3,
        "createAt": "2023-08-08T15:00:00",
        "endAt": "2023-08-15T15:00:00",
        "discount": 30,
        "price": 20000,
        "itemOptionDtoList": [
            {
                "id": 1604,
                "optionName": "레드",
                "stock": 100
            },
            {
                "id": 1605,
                "optionName": "오렌지",
                "stock": 100
            },
            {
                "id": 1606,
                "optionName": "핑크",
                "stock": 100
            }
        ],
        "itemPhotoDtoList": [
            {
                "id": 1602,
                "itemImage": "https://m.romand.co.kr/web/product/big/202306/85702c95740d57f55b23e0edb9dfb64c.jpg",
            },
            {
                "id": 1603,
                "itemImage": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0018/A00000018727204ko.jpg?l=ko"
            },
            {
                "id": 1604,
                "itemImage": "https://image.oliveyoung.co.kr/uploads/images/goods/550/10/0000/0018/A00000018727203ko.jpg?l=ko"
            }
        ],
        "itemDetailPhotoDtoList": [
            {
                "id": 1,
                "itemImage": "https://m.romand.co.kr/web/upload/NNEditor/20230616/copy-1686899483-EBA1ACEC95A4XEC82B0EBA6ACEC98A4-EC9993EC9790EBB284EAB1B8EC8AA4-1ECB0A8-ED8BB0ECA795_04.jpg",
            },
            {
                "id": 2,
                "itemImage": "https://m.romand.co.kr/web/upload/NNEditor/20230626/copy-1687747287-teasing_2_18.jpg"
            },
            {
                "id": 3,
                "itemImage": "https://m.romand.co.kr/web/upload/NNEditor/20230620/teasing_2_9.jpeg"
            },
            {
                "id": 4,
                "itemImage": "https://m.romand.co.kr/web/upload/NNEditor/20230620/teasing_2_13.jpeg"
            },
            {
                "id": 5,
                "itemImage": "https://m.romand.co.kr/web/upload/NNEditor/20230616/EBA1ACEC95A4XEC82B0EBA6ACEC98A4-EC9993EC9790EBB284EAB1B8EC8AA4-1ECB0A8-ED8BB0ECA795_0828EC8898ECA09529.jpg"
            }

        ],
        user: {

            "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpsrY1SG7leZFYE6nDsRusqHOM4zX2ojNPiw&usqp=CAU",
            "nickname": "흰둥이",
            "role": "IF",
        },
    }

    const options = ItemDetailData.itemOptionDtoList.map((option) => ({
        value: option.id,
        label: option.optionName,
        stock: option.stock,
        count: 1
    }));

    
    const price = ItemDetailData.price
    const maximumItem = ItemDetailData.maximum
    const [totalCount, setTotalCount] = useState(0)

    const handleSelectChange = (selectedValue) => {
        console.log(selectedValue);
        // Check if the selected option is already in the list
        const existingOptionIndex = selectedOptionList.findIndex(
          (option) => option.value === selectedValue.value
        );
        setTotalCount(totalCount + selectedValue.count)
        
        // const totalCount = selectedOptionList.reduce((total, option) => total + option.count, 1);
        // console.log(totalCount);

        if (existingOptionIndex !== -1) {
          // Option already exists in the list, increment its count
          handleIncrement(existingOptionIndex);
        } else {
            // const totalCount = selectedOptionList.reduce((total, option) => total + option.count, 1);
            // console.log(totalCount)
          // Option is not in the list, add it with count 1
          if (totalCount > maximumItem)  {
            console.log("실행")
            alert(`You can only select up to ${maximumItem} items.`);
        } else {
            setSelectedOptionList((prevSelected) => [...prevSelected, selectedValue]);
        }
        }
      };

      console.log('totalCount',totalCount)
    useEffect(() => {
        if (totalCount === ItemDetailData.maximum) {
            alert("그이상 못산다")
        }
    })

    const handleClearClick = (index) => {
        setSelectedOptionList((prevSelected) => {
            const newSelected = [...prevSelected];
            newSelected.splice(index, 1);
            return newSelected;
        })
    }
    
    const handleIncrement = (index) => {
        setSelectedOptionList((prevSelected) => {
          const newSelected = [...prevSelected];
          newSelected[index].count += 1;
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


    


    return (
        <div>
            <div className={styles.btn_container}>
                <button onClick={openModal} className={styles.btn}>Buy</button>
            </div>

            {/* 모달창 */}
            {
                isModalOpen && (
                <div className={styles.modal_background}>
                    <div className={styles.modal_top}>
                        <div className={styles.close_modal} onClick={closeModal}>
                            <HighlightOffIcon />
                        </div>
                        <div className={styles.modal}>
                            <div>

                            </div>
                            <div className={styles.select_box}>
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
            )}    
        </div>
    )

}

export default ItemDetailBottom;