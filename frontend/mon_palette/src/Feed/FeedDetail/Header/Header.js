import React from "react";
import styles from "./Header.module.css";
import FollowButton from "./FollowButton/FollowButton";

function Header() {
    const FeedData = {
        "status": "success",
        "message": null,
        "data": [
            {
                "id": 1,
                "content": "쿠로미 귀여웡 귀여웡 쫀귀탱탱",
                "user": [
                    {
                        "userId": 23,
                        "userNickname": "ysk",
                        "personalColor": "summer cool",
                        "profileImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShoVme-PZaEOSY_dTvGc_zpbDUXfcRIyHNoA&usqp=CAU"
                    }
                ],
                "tagContent": "#쿠로미",
                "comment": [
                    {
                        "id": 1,
                        "userId": 71,
                        "commentContent": "너무 귀엽쟈나",
                        "createdAt": "2023-07-26T10:10:32.146994"

                    },
                    {
                        "id": 2,
                        "userId": 90,
                        "commentContent": "호엑",
                        "createdAt": "2023-07-26T10:15:32.146994"

                    },
                    {
                        "id": 3,
                        "userId": 89,
                        "commentContent": "쫀귀",
                        "createdAt": "2023-07-26T10:32:32.146994"

                    }
                ],
                "createAt": "2023-07-26T10:09:32.146994",
                "updateAt": null,
                "isDelete": false,
                "deleteAt": null
            }
        ]
    };
    return (
        <div className="header_container">
                {FeedData.data.map((feed) => (
                    <div>
                        {
                            feed.user.map((info) => (
                                <div className="header_wrap">
                                    <div>
                                    <div className={styles.wrap}>
                                        <img
                                        className={styles.profile}
                                        key = {info.id}
                                        src={info.profileImage}
                                        />
                                    </div>
                                    <div className="header_user">
                                        <span>{info.userNickname}</span>
                                        <span>{feed.createAt}</span>

                                        </div>    
                                    </div>
                                    <FollowButton text="Follow"/>
                                </div>

                            ))
                        }
                    </div>
                ))}
            </div>
    )
                    
}

export default Header;