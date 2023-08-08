import React, { useState, useEffect, useRef } from "react";
import styles from "./Comment.module.css"
import { FixedSizeGrid as Grid } from 'react-window';
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { MoreOutlined, SendOutlined } from '@ant-design/icons';
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

    const token = useRecoilValue(loginState)
    const userInfo = useRecoilValue(userId)

    const [check, setCheck] = useState(false)
    const [comments, setComments] = useState([])
    const { feedId } = useParams()
    const [content, setContent] = useState("")
    const [modalStates, setModalstates] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");


    // 댓글 불러오기
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/api/feed/${feedId}/comment?page=0`,{
                headers: { Authorization: token },
            })
            .then((response) => {
                console.log(response.data.data);
                setComments(response.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [check]);

    
    // 댓글 Create
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);

        axios
        .post(`${process.env.REACT_APP_API}/api/feed/${feedId}/comment`, {
            content: event.target[0].value
        }, {
            headers: { Authorization: token }
        })
        .then ((response) => {
            console.log(response);            
            event.target[0].value = "";
            if (check) {
                setCheck(false)
            } else {
                setCheck(true)
            }
             // setComments((prevComments) => [...prevComments, response.data]);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    // 작성자 여부 판단
    const isCurrentUser = (user) => {
        if(user === userInfo) {
            return (
                true
                )
        }
    }


    // 댓글 수정
    const handleEdit = (commentId) => {
        const commentToEdit = comments.find((comment) => comment.id === commentId)
        if (commentToEdit) {
            setEditedContent(commentToEdit.content)
            setEditingCommentId(commentId)
            updateModalState(commentId, true)
            handleCloseOtherModals(commentId)
        }
    }

    // 댓글 편집 취소
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedContent("");
    }
    
    // 댓글의 모달 상태 업데이트
    const updateModalState = (commentId, value) => {
        setModalstates((prevModalStates) => ({
            ...prevModalStates,
            [commentId]: value,
        }))
    }

    const handleCloseOtherModals = (currentCommentId) => {
        setModalstates((prevModalStates) => {
            const newModalStates = {...prevModalStates}
            for (const commentId in newModalStates) {
                if (commentId !== newModalStates) {
                    newModalStates[commentId] = false;
                }
            }
            return newModalStates;
        })
    }
    
    const handleMoreClick = (commentId) => {
        if (modalStates[commentId]) {
            updateModalState(commentId, false)
        } else {
            handleCloseOtherModals(commentId)
            updateModalState(commentId, true)
        }
    }

    const handleSaveEdit = () => {
        if (editingCommentId && editedContent.trim() !== "") {
            const editedComment = {
                content: editedContent,
            }
            axios
            .put(`${process.env.REACT_APP_API}/api/comment/${editingCommentId}`, editedComment, {
                headers: { Authorization: token}
            })
            .then((response) => {
                setEditingCommentId(null);
                setEditedContent("")
                console.log("댓글 수정");
                if (check) {
                    setCheck(false)
                } else {
                    setCheck(true)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
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
                            {editingCommentId === comment.id ? (
                                <div>
                                    <textarea
                                    value={editedContent}
                                    onChange={(event) => setEditedContent(event.target.value)}
                                    />
                                    <button 
                                    className={styles.edit_btn}
                                    onClick={handleSaveEdit}>Save</button>
                                    <button onClick={handleCancelEdit}>cancel</button>
                                </div>
                            ) : (
                                <p>{comment.content}</p>
                            )}
                        
                        </div>
                        {
                                isCurrentUser(comment.user.id) ? (
                                    <div 
                                    className={styles.more_btn}
                                    onClick={() => handleMoreClick(comment.id)}><MoreOutlined /></div>
                                    ) : (
                                        <div></div>
                                    )}
                            {/* 모달창 */}
                            {modalStates[comment.id] && (
                                <div className={styles.modal}>
                                <div className={styles.modalContent}>
                                    <button onClick={() => handleEdit(comment.id)}>수정</button>
                                    {/* 닫기 버튼 */}
                                    <button onClick={() => updateModalState(comment.id, false)}>닫기</button>
                                </div>
                            </div>
                        )}
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
                    className={styles.btn}><SendOutlined /></button>
                </form>
            </div>

        </div>
        </div>
    );
      
}

export default Comment; 