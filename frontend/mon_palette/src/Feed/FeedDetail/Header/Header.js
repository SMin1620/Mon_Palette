import React, { useRef, useState, useEffect} from "react";
import styles from "./Header.module.css";
import FollowButton from "./FollowButton/FollowButton";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
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
    const userInfo = useRecoilValue(userId)
    const [feedData, setFeedData] = useState('')
    
    console.log(feedData);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/api/feed/${feedId}`,{
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

    const following = (idid) => {
        axios.post(`${process.env.REACT_APP_API}/api/follow/${idid}`, {}, {
            headers: { Authorization: token },
        })
        .then((response => {
            console.log(response);
            console.log("follow");
            
        }))
        .catch((err => {
            console.log(err);
        }))
            
    }

     // 작성자 여부 판단
     const isCurrentUser = (user) => {
        console.log(user, "user");
        console.log(userInfo, "token");
        if(user === userInfo) {
            console.log(user.id, "user.id");
            return (
                true
            )
        }
    }

    return (
       feedData && <div className="header_container">
             
                <div className={styles.feedTotalInfo}>
                    <div className={styles.author_img}>
                        <img 
                        className={styles.img}
                        src={feedData.user.profileImage} alt="aaaaa" />
                    </div>

                    <div className={styles.author_info}>
                        <div className={styles.author_info_left}>
                            <h3
                            className={styles.h3}
                            >{feedData.user.nickname}</h3>
                            <p>{getTimegap(feedData.createAt)}</p>
                        
                    </div>
                    <div>
                        <span>
                            {feedData.user.personalColor}
                        </span>
                    </div>
                    <div className={styles.follow}>
                    {isCurrentUser(feedData.user.id) ? (
                                    <div>
                                    </div>
                                ) : (
                                    <div onClick={() => following(feedData.user.id)}>
                                        <FollowButton text={feedData.isFollow ? "Following" : "Follow"} />
                                    </div>
                                )}
                    </div>
                </div>
            </div>
        </div>
 )               
}

export default Header;