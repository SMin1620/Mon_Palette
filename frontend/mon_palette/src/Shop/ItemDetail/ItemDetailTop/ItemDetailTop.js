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
        thumbnail: [
            { 
                id: 1,
                imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMDLcfN9cl91KV-xNfqxgZo6jPDbIIBvOUOQ&usqp=CAU"
            },
            {
                id: 2, 
                imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC4cMS0bf1-t86bf-zAA67MXPXsGLrtZcXvQ&usqp=CAU"
            },
            {
                id: 3,
                imagePath: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq296nUsfyp04NukLFkperiSyZouZzrKva5w&usqp=CAU"
            }

        ],
        itemName: "롬앤 틴트",
        discout: 30,
        price: 20000,
        content : {
            itemImage: "https://m.romand.co.kr/web/upload/NNEditor/20230616/copy-1686899483-EBA1ACEC95A4XEC82B0EBA6ACEC98A4-EC9993EC9790EBB284EAB1B8EC8AA4-1ECB0A8-ED8BB0ECA795_04.jpg",
            description: "롬앤 * 산리오 콜라보 상품이에요! 우와앙아아앙 다들 환영해주세요!! ",
            descriptionImage: "https://m.romand.co.kr/web/upload/NNEditor/20230626/copy-1687747287-teasing_2_18.jpg"
        },
        user: {
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpsrY1SG7leZFYE6nDsRusqHOM4zX2ojNPiw&usqp=CAU",
            nickname: "롬앤",
        },
        createAt : ""
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
        <div>
            <div
                className={styles.blank_space}>
            </div>
            <div>
                <Slider {...settings}>
                    {ItemDetailData.thumbnail.map((image, index) => (
                        <div className={styles.thumbnail} key={image.id}>
                            <img
                                className={styles.thummb_img}
                                src={image.imagePath}
                                alt=""
                                />
                        </div>
                    ))}
                </Slider> 
            </div>
        </div>
    )

}

export default ItemDetailTop;