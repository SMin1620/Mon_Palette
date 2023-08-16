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
// import { logDOM } from "@testing-library/react";


function ItemDetailBottom () {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemDetailData, setItemDetailData] = useState("")
    // const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionList, setSelectedOptionList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { itemId } = useParams()
    const token = useRecoilValue(loginState)


    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/api/item/detail/1608`, {
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

    const options = itemDetailData && itemDetailData.itemOptionDtoList.map((option) => ({
        value: option.id,
        label: option.optionName,
        stock: option.stock,
        count: 1
    }));


    const price = Math.round(itemDetailData.price * ((100 - itemDetailData.discount) * 0.01 ));

    const maximumItem = itemDetailData.maximum
    const [totalCount, setTotalCount] = useState(0)

    const handleSelectChange = (selectedValue) => {
        const newTotalCount = totalCount + selectedValue.count;

        if (newTotalCount > maximumItem) {
        alert(`최대 ${maximumItem}개까지 선택할 수 있습니다.`);
        return;
    }

    setTotalCount(newTotalCount);

    const existingOptionIndex = selectedOptionList.findIndex(
        (option) => option.value === selectedValue.value
    );

    if (existingOptionIndex !== -1) {
        handleIncrement(existingOptionIndex);
    } else {
        setSelectedOptionList((prevSelected) => [...prevSelected, selectedValue]);
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
        const cartItems = selectedOptionList.map((option) => {
            return {
                itemId: option.label,
                count: option.count,
            }
        })


        axios
        .post(`${process.env.REACT_APP_API}/api/cart`, {
            cartItems: cartItems,
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
    
        </div>
    )

}

export default ItemDetailBottom;