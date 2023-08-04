import React, { useState, useEffect } from "react";
import styles from "./Comment.module.css"
import { FixedSizeGrid as Grid } from 'react-window';
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { useParams } from 'react-router-dom';
import axios from "axios"
// import InfiniteLoader from 'react-window-infinite-loader';

// 댓글 작성시간 구하는 함수
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


function Comment() {

    const [comments, setComments] = useState([])
    const { feedId } = useParams()
    const token = useRecoilValue(loginState)
    const [content, setContent] = useState("")

    useEffect(() => {
        axios
            .get(`http://192.168.30.224:8080/api/feed/${feedId}/comment?page=0`,{
                headers: { Authorization: token },
            })
            .then((response) => {
                console.log(response.data.data);
                setComments(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);

        axios
        .post(`http://192.168.30.224:8080/api/feed/${feedId}/comment`,{
            content: event.target[0].value
        }, {
            headers: { Authorization: token }
        })
        .then ((response) => {
            console.log(response);
            event.target[0].value = "";
            // setComments((prevComments) => [...prevComments, response.data]);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    

    return (
        <div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <div>
                {
                    <div className={styles.commentInfo}>
                        <div>
                            <img
                            className={styles.img}
                            src={comment.user.profileImage}
                            alt=""
                            />
                        </div>
                        <div className={styles.author_info}>
                            <span
                            className={styles.author}
                            >{comment.user.nickname}</span>
                            <div className={styles.time}>{getTimegap(comment.createAt)}</div>
                        </div>
                        <div className={styles.content_wrap}>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                }
              </div>
            </div>
          ))}
        <div>
            
            <div 
            className={styles.input_wrap}>
            
                <form
                onSubmit={onSubmit}
                className={styles.form}>
                    <input
                    type="text"
                    placeholder="Write your comment..."
                    className={styles.input}
                    />
                    <button
                    className={styles.btn}>submit</button>
                </form>
            </div>

        </div>
        </div>
    );
      
}

export default Comment;