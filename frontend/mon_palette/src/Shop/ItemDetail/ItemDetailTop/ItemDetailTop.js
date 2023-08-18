import React, { useState, useEffect } from "react";
import styles from "./ItemDetailTop.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import { useNavigate, useParams } from "react-router-dom";
import { MoreOutlined, SendOutlined, EditOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import TopButton from "../TopButton/TopButton";


function ItemDetailTop() {

    const [itemDetailData, setItemDetailData] = useState("")
    const [showModal, setShowModal] = useState(false);

    const itemId = useParams()
    const token = useRecoilValue(loginState)
    const userInfo = useRecoilValue(userId)
    const navigate = useNavigate()

    useEffect(() => {
       axios
       .get(`${process.env.REACT_APP_API}/api/item/detail/${itemId.id}`, {
        headers: { Authorization: token },
       })
       .then ((response) => {
        console.log(response.data.data);
        console.log(response.data.data.user.nickname);
        setItemDetailData(response.data.data)
        // console.log(ItemDetailData);
       })
       .catch ((err) => {
            console.log(err);
       })
    },[])

    console.log(itemId);

  
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true
    }
    

    const createDateFormatted = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const startDay = createDateFormatted(itemDetailData.createAt)
    const endDay = createDateFormatted(itemDetailData.endAt)


     // 작성자 여부 판단
     const isCurrentUser = (user) => {
        if(user === userInfo) {
            return (
                true
                )
        }
    }

    const handleMoreClick = () => {
        if (showModal) {
            setShowModal(false);
        } else {
            setShowModal(true);
        }
    };

    const handleDelete = () => {
        axios
        .delete(`${process.env.REACT_APP_API}/api/item/${itemId}`, {
            headers: { Authorization: token },
        })
        .then(response => {
            console.log(response, "아이템 삭제 성공");
            navigate(`/shop/`);
            setShowModal(false);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleEdit = () => {
        navigate(`/itemmodify/${itemId.id}`, { state: { itemDetailData }});
        setShowModal(false);
    }



    return (
        <div className={styles.item_container}>
            <div
                className={styles.blank_space}>
            </div>
            <div className={styles.thumb_wrap}>
                <Slider {...settings}>
                    {
                        itemDetailData && (
                        itemDetailData.itemPhotoDtoList.map((image) => (
                            <div className={styles.thumbnail} key={image.id}>
                                <img
                                   className={styles.thumb_img}
                                    src={image.itemImage}
                                    alt=""
                                    />
                            </div>
                        )))
                    }
                </Slider> 
            </div>


            { itemDetailData && (
            <div>
                <div className={styles.seller_info}>
                    <div>
                        <img
                            className={styles.seller}
                            src={itemDetailData.user.profileImage}
                            alt=""
                        />
                    </div>
                    <div className={styles.seller_name}>
                        <h5
                        className={styles.h5}>
                            {itemDetailData.user.nickname}
                        </h5>
                    </div>
                    { isCurrentUser(itemDetailData.user.id) ? (
                        <div 
                        className={styles.more_btn}
                        onClick={handleMoreClick}><MoreOutlined /></div>
                    ) : (
                        <div></div>
                    )}
                     {/* 모달창 */}
            { showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <button
                        className={styles.delete_btn}
                        onClick={handleDelete}><DeleteOutlined /></button>
                        <button
                        className={styles.edit_btn}
                        onClick={handleEdit}><EditOutlined /></button>
                    </div>
                </div>
            )}
                </div>
                <div className={styles.name}>
                    <p>{ itemDetailData.name }</p>
                </div>
            </div>
            )}

           

            { itemDetailData && (
            <div className={styles.price_wrap}>
                <div>
                    <p
                    className={styles.discount}>{itemDetailData.discount}%</p>
                </div>
                <div>
                    <p
                    className={styles.price}>{itemDetailData.price}</p>
                </div>
                <div>
                    <p className={styles.result_price}>{ 
                        Math.round(itemDetailData.price * ((100 - itemDetailData.discount) * 0.01 )).toLocaleString()} ₩</p>
                </div>
            </div>
            )}
            <div className={styles.delivery_fee}>
                <p>Delivery Fee: { itemDetailData.deliveryFee }</p>
            </div>
            <div className={styles.maximum}>
                maximum : { itemDetailData.maximum }
            </div>
            <div className={styles.date}>
                End at : {endDay}
            </div>
            
            { itemDetailData &&
            <div className={styles.content_wrap}>
                <div className={styles.content}>
                    {itemDetailData.content}
                </div>
            </div>
            }

            <div className={styles.detail_photo_container}>
                {   
                    itemDetailData && itemDetailData.itemDetailPhotoDtoList.map((image, index) => (
                        <div key={index}>
                            <img
                                className={styles.detail_photo}
                                key={image.id}
                                src={image.itemImage}
                                alt=""
                            />
                        </div>
                        
                    ))
                }
            </div>
            <div className={styles.top_btn}>  
            <TopButton />
            </div>

        </div>
    )

}

export default ItemDetailTop;