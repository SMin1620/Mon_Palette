import React, { useState, useEffect } from "react";
import styles from "./ItemDetailTop.module.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";


function ItemDetailTop() {

    const [ItemData, setItemData] = useState("")

    const ItemDetailData = {
        "thumbnail": "https://pbs.twimg.com/media/EZLMS90VcAUXk-z.jpg:large",
        "id": 1603,
        "name": "롬앤 틴트",
        "content": "롬앤 * 산리오 콜라보 상품이에요! 우와앙아아앙 다들 환영해주세요!!",
        "manufact": "롬앤",
        "deliveryFee": "Free",
        "maximum": 1,
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

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true
    }
    


    return (
        <div className={styles.item_container}>
            <div
                className={styles.blank_space}>
            </div>
            <div className={styles.thumb_wrap}>
                <Slider {...settings}>
                    {
                        ItemDetailData.itemPhotoDtoList.map((image) => (
                            <div className={styles.thumbnail} key={image.id}>
                                <img
                                   className={styles.thumb_img}
                                    src={ItemDetailData.thumbnail}
                                    alt=""
                                    />
                            </div>
                        ))
                    }
                </Slider> 
            </div>

            <div>
                <div className={styles.seller_info}>
                    <div>
                        <img
                            className={styles.seller}
                            src={ItemDetailData.user.profileImage}
                            alt=""
                        />
                    </div>
                    <div className={styles.seller_name}>
                        <h3
                        className={styles.h3}>
                            {ItemDetailData.user.nickname}
                        </h3>
                    </div>
                </div>
            </div>

            <div className={styles.price_wrap}>
                <div>
                    <p
                    className={styles.discount}>{ItemDetailData.discount}%</p>
                </div>
                <div>
                    <p
                    className={styles.price}>{ItemDetailData.price}</p>
                </div>
                <div>
                    <p className={styles.result_price}>{ 
                        Math.round(ItemDetailData.price - (ItemDetailData.price / ItemDetailData.discount))}₩</p>
                </div>
            </div>

        </div>
    )

}

export default ItemDetailTop;