import React, { useRef, useState, useEffect} from "react";
import styles from "./Header.module.css";
import FollowButton from "./FollowButton/FollowButton";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { useParams } from 'react-router-dom';


const getTimegap = (createdAt) => {
    const msgap = Date.now() - new Date(createdAt).getTime();
    const minutegap = Math.floor(msgap / 60000);
    const hourgap = Math.floor(msgap / 3600000);
    const daygap = Math.floor(msgap / 86400000);
    const weekgap = Math.floor(msgap / (86400000 * 7));

    if (msgap < 0) {
        return <span>0분전</span>;
      } else if (weekgap > 0) {
        return <span>{weekgap}주 전</span>;
      } else if (daygap > 0) {
        return <span>{daygap}일 전</span>;
      } else if (hourgap > 0) {
        return <span>{hourgap}시간 전</span>;
      } else {
        return <span>{minutegap}분 전</span>;
      }
};

function Header() {

    const {feedId} = useParams()
    const token = useRecoilValue(loginState)
    const [feedData, setFeedData] = useState('')
    const [base, setBase] = useState("https://ssafy9-monpalette.s3.ap-northeast-2.amazonaws.com/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png");
    console.log(feedData, "header");
    console.log(feedData.createAt);
    console.log(feedData.likeCount);

    useEffect(() => {
        axios
            .get(`http://192.168.30.224:8080/api/feed/${feedId}`,{
                headers: { Authorization: token },

            })
            .then ((response) => {
                console.log(response.data.data, "response")
                setFeedData(response.data.data)
                
            })
            .catch ((err) => {
                console.log(err)
            })
    },[])

    console.log('feedData', feedData)


    // const FeedData = {
    //     "status": "success",
    //     "message": null,
    //     "data": [
    //         {
    //             "id": 1,
    //             "content": "쿠로미 귀여웡 귀여웡 쫀귀탱탱",
    //             "user": [
    //                 {
    //                     "userId": 23,
    //                     "userNickname": "ysk",
    //                     "personalColor": "summer cool",
    //                     "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoVme-PZaEOSY_dTvGc_zpbDUXfcRIyHNoA&usqp=CAU",
    //                     "isFollowed": false
    //                 }
    //             ],
    //             "tagContent": "#쿠로미",
    //             "comment": [
    //                 {
    //                     "id": 1,
    //                     "userId": 71,
    //                     "commentContent": "너무 귀엽쟈나",
    //                     "createdAt": "2023-07-26T10:10:32.146994"

    //                 },
    //                 {
    //                     "id": 2,
    //                     "userId": 90,
    //                     "commentContent": "호엑",
    //                     "createdAt": "2023-07-26T10:15:32.146994"

    //                 },
    //                 {
    //                     "id": 3,
    //                     "userId": 89,
    //                     "commentContent": "쫀귀",
    //                     "createdAt": "2023-07-26T10:32:32.146994"

    //                 }
    //             ],
    //             "createAt": "2023-07-26T10:09:32.146994",
    //             "updateAt": null,
    //             "isDelete": false,
    //             "deleteAt": null
    //         }
    //     ]
    // };
    console.log(feedData)
    return (
       feedData && <div className="header_container">
            
                
                    <div className={styles.feedTotalInfo}>
                        <div className={styles.author_img}>
                            <img 
                            className={styles.img}
                            src={feedData.user.profileImage === null? base: feedData.user.profileImage} alt="aaaaa" />
                        </div>

                        <div className={styles.author_info}>
                            <div className={styles.author_info_left}>
                                <h3
                                className={styles.h3}
                                >{feedData.user.nickname}</h3>
                                <p>{getTimegap(feedData.createAt)}</p>
                            
                        </div>

                        <div className={styles.follow}>
                            {
                                feedData.isFollow ? (<FollowButton text="Following" />) : (
                            
                            <FollowButton text="Follow" />)
                            }
                        </div>
                    </div>
                </div>
                
            
        </div>
 )               
}

export default Header;