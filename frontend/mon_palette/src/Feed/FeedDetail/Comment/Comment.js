import React, { useState, useEffect, useRef } from "react";
import styles from "./Comment.module.css"
import { FixedSizeGrid as Grid } from 'react-window';
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import { useParams } from 'react-router-dom';
import axios from "axios"
import { MoreOutlined, SendOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PropagateLoader }  from 'react-spinners';
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
    const [feedPage, setFeedPage] = useState(0);
    const [load, setLoad] = useState(true)

    const preventRef = useRef(true)
    const obsRef = useRef(null);
    const endRef = useRef(false);

    // useEffect(() => {
    //     if (props.midCategory !== null ) {
    //         // setCategoryItem([])
    //         // handleCategoryItem([])
    //         const observer = new IntersectionObserver(handleObs, { threshold: 0.5});
    //         if (obsRef.current) observer.observe(obsRef.current);
    //         return () => { observer.disconnect(); };
    //     }
    // }, [props.midCategory])

    // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
    // const handleObs = (entries) => {
    //     const target = entries[0];
    //     if (!endRef.current && target.isIntersecting) {
    //       preventRef.current = false
    //       // 스크롤 바닥에 도달하면 페이지 번호를 증가시키고 데이터를 가져옴
    //       setCategoryPage((prevPage) => prevPage + 1);
    //     }
    //   };

      

      const getFeed = async () => {
    try {
      await axios
        .get(`${process.env.REACT_APP_API}/api/feed/${feedId}/comment?page=${feedPage}`, {
          headers: { Authorization: token }
        })
        .then((response) => {
          
          if (response.data.data.comments.length !== 10) {
            endRef.current = true
            setLoad(false)
            setComments(response.data.data);
            // setFeedInfo((prevFeedInfo) => [...prevFeedInfo, ...response.data.data.feeds])
            // setTagInfo(response.data.data.tagRanking)
          } else {
            // setFeedInfo((prevFeedInfo) => [...prevFeedInfo, ...response.data.data.feeds]);
            // setTagInfo(response.data.data.tagRanking)
            preventRef.current = true
          }
        })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed(); // axios 요청 보내기
    const observer = new IntersectionObserver(handleObs, { threshold: 0.5 }); // 페이지 최초 렌더링시 옵저버 생성
    if (obsRef.current) observer.observe(obsRef.current);
    return () => { observer.disconnect(); }; // 페이지 언마운트시 옵저버 해제
  }, [check]);

  useEffect(() => {
    if (feedPage !== 0) {
      getFeed();
    }
  }, [feedPage]);

  // 무한스크롤 구현해서 피드에서 내려갈때마다 axios 요청 보내자
  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
      preventRef.current = false
      // 스크롤 바닥에 도달하면 페이지 번호를 증가시키고 데이터를 가져옴
      setFeedPage((prevPage) => prevPage + 1);
    }
  };
    


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
                    <div className={styles.comment_info}>
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
                                    className={styles.textarea}
                                    value={editedContent}
                                    onChange={(event) => setEditedContent(event.target.value)}
                                    />
                                    <button 
                                    className={styles.icon_btn}
                                    onClick={handleSaveEdit}><SendOutlined /></button>
                                    <button 
                                    className={styles.icon_btn}
                                    onClick={handleCancelEdit}><CloseCircleOutlined /></button>
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
                                    <button 
                                    className={styles.icon_btn} onClick={() => handleEdit(comment.id)}><EditOutlined /></button>
                                    {/* 닫기 버튼 */}
                                    {/* <button onClick={() => updateModalState(comment.id, false)}>닫기</button> */}
                                </div>
                            </div>
                        )}
                    </div>
                }
                </div>
            </div>
          ))}

          {/* 이부분이 보이면 ref로 무한 스크롤 구현 */}
            {
                load ? 
                <div className="observer_spinner" ref={obsRef}>
                <PropagateLoader color='#fdf2f7'/>
                </div>
                :
                <div
                className="observer_last_data"
                ref={obsRef}
                >Last Page</div>
            }
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