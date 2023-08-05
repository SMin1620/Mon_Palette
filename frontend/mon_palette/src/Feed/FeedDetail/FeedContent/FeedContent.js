import React, { useRef,useState, useEffect } from "react";
import styles from "./FeedContent.module.css"
import { HeartOutlined, HeartFilled , CommentOutlined, MoreOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import { userId } from "src/user/components/Atom/UserId";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FollowButton from "../Header/FollowButton/FollowButton"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function FeedContent() {

    const navigate = useNavigate()

    const { feedId } = useParams()
    const [feedData, setFeedData] = useState('')
    const [feedLike, setfeedLike] = useState(feedData.isLiked);
    const [likeList, setLikeList] = useState(false)
    const [likeListData, setLikeListData] = useState([])
    const [showModal, setShowModal] = useState(false);
    
    const token = useRecoilValue(loginState)
    const userInfo = useRecoilValue(userId)

    // 좋아요 리스트 목록에서 팔로우 등록/취소
    const following = (idid) => {
        axios.post(`${process.env.REACT_APP_API}/api/follow/${idid}`, {}, {
            headers: { Authorization: token },
        })
        .then((response => {
            console.log(response);
            
        }))
        .catch((err => {
            console.log(err);
        }))
            
    }
    
    // feed content 내용 조회
    useEffect(() => {
        axios
        .get(`${process.env.REACT_APP_API}/api/feed/${feedId}`,{
            headers: { Authorization: token },
            
        })
        .then ((response) => {
            console.log(response);
            setFeedData(response.data.data)
            setfeedLike(response.data.data.isLiked);
        })
        .catch ((err) => {
            console.log(err)
        })
    },[feedLike])
    
    
    // 좋아요 리스트 
    useEffect(() => {
        if (likeList) {
            axios
            .get(`${process.env.REACT_APP_API}/api/feed/${feedId}/like`, {
                headers: { Authorization: token },
            })
            .then((response) => {
                console.log(response.data.data);
                setLikeListData(response.data.data)
            })
            .catch((err) => {
                    console.log(err);
                });
        }
    }, [likeList]);

    // 작성자 여부 판단
    const isCurrentUser = (user) => {
        if(user === userInfo) {
            return (
                true
                )
        }
    }
    
    
    
    // 좋아요 리스트 띄우는 모달창 flag
    const likeCount = () => {
        setLikeList ( prevLikeList => !prevLikeList
            )
        }
        
        
    // useEffect(() => {
        //     if (likeList) {
            
            //     }
            // },[likeList])
            
    // 피드를 좋아요 하는 함수
    const likeFeed = () => {
        axios.post(`${process.env.REACT_APP_API}/api/feed/${feedId}/like`, {} ,{
            headers: { Authorization: token },
        })
            .then((response => {
                console.log(response)
                // 좋아요 상태를 true로 변경
                setfeedLike(true);
                setFeedData(prevFeedData => ({
                    ...prevFeedData,
                    likeCount: prevFeedData.likeCount + 1
                }))
                console.log('피드 좋아요');
            }))
            .catch((err => {
                console.error('피드 좋아요 오류:', err);
            }));
        };
        
        // 피드 좋아요를 취소하는 함수
        const unlikeFeed = () => {
            axios.delete(`${process.env.REACT_APP_API}/api/feed/${feedId}/like`, {
                headers: { Authorization: token },
            })
            .then(response => {
                // 좋아요 상태를 false로 변경
                setfeedLike(false);
                setFeedData(prevFeedData => ({
                    ...prevFeedData,
                    likeCount: prevFeedData.likeCount - 1
                }))
                console.log('피드 좋아요 취소');
            })
            .catch(err => {
                console.error('피드 좋아요 취소 오류:', err);
            });
        };
        
        const handleMoreClick = () => {
            setShowModal(true);
        }
        
        const handleEdit = () => {
            navigate(`/feed/edit/${feedId}`, { state: { feedData } });
        setShowModal(false);
    }
    
    const handleDelete = () => {
        axios
        .delete(`${process.env.REACT_APP_API}/api/feed/${feedId}`,{
            headers: { Authorization: token },
        })
        .then(response => {
                console.log("피드 삭제 성공:", response);
            // 피드 삭제에 성공하면 모달창을 닫습니다.
            setShowModal(false);
        })
        .catch(error => {
            console.error("피드 삭제 오류:", error);
        });
    };

const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true
}

return (
    <div className={styles.container}>
                <div className={styles.feed}>
                    <div className="feed_wrapper">
                    <Slider {...settings}>
                    {
                        feedData && feedData.feedImages.map((image, index) => (
                            <div className={styles.feed_item} key={index}>
                        <img
                        className={styles.img}
                        key = {image.id}
                        src={image.imagePath}
                        alt=""
                        />
                        </div>
                    ))} 
                    </Slider>
                    </div>
                    <br />
                    <div className="feed_status">
                        <span>
                         {feedLike ? (
                            <HeartFilled className={styles.heart_filled} onClick={() => unlikeFeed()} />
                        ) : (
                            <HeartOutlined className={styles.heart} onClick={() => likeFeed()} />
                        )}
                        </span>
                        <span>
                            <CommentOutlined
                            className={styles.comment} />
                        </span>
                        <div>
                            <div className={styles.like_count} 
                            onClick={likeCount}>
                                좋아요
                                {feedData.likeCount} 개
                                {/* 좋아요 갯수 표시 */}
                                
                            </div>
                                {
                                feedData && isCurrentUser(feedData.user.id) ? (
                                    <div onClick={handleMoreClick}><MoreOutlined /></div>
                                    ) : (
                                        <div></div>
                                    )}

                        {/* 모달창 */}
                        {showModal && (
                            <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                {/* 삭제 버튼 */}
                                <button onClick={handleDelete}>삭제</button>
                                <button onClick={handleEdit}>수정</button>
                                {/* 닫기 버튼 */}
                                <button onClick={() => setShowModal(false)}>닫기</button>
                            </div>
                            </div>
                        )}
                        </div>

                    </div>
                    <p 
                    className={styles.content}>{feedData.content}</p>
                    
            
                </div>
                {/* 좋아요 리스트 모달창 */}
                <div className={`${styles.page} ${likeList ? styles.open : ''}`}>
                    <div className={styles.modal_header}>
                        <div>
                            <ArrowBackIcon sx={{ fontSize: 20 }}
                            onClick = {likeCount}
                            className = {styles.back_btn} />
                        </div>

                        <div className={styles.header_name}>
                            Liked List
                        </div>

                        <div className={styles.temp_div}>

                        </div>
                    </div>
                   {
                    likeListData.map((user, index) => (
                        <div className={styles.user_wrap} key={index}>
                            <div
                            className={styles.like_list}>
                                <div>
                                    <img
                                    className={styles.profile_img}
                                    src = {user.profileImage}
                                    alt = ""
                                    />
                                </div>
                                <div
                                className= {styles.nickname}
                                >
                                    {user.nickname}
                                </div>
                            </div>
                            <div className={styles.follow_button}>
                            {isCurrentUser(user.id) ? (
                                    <div>
                                    </div>
                                ) : (
                                    <div onClick={() => following(user.id)}>
                                        <FollowButton text={user.isFollow ? "Following" : "Follow"} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                   }        
                </div>

            
         </div>
    )
    
}

export default FeedContent;