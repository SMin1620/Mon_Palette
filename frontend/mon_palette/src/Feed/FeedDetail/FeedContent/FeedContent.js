import React, { useRef,useState, useEffect } from "react";
import styles from "./FeedContent.module.css"
import { HeartOutlined, HeartFilled , CommentOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom/loginState";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FollowButton from "../Header/FollowButton/FollowButton"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function FeedContent() {

    console.log("feedcontent");

    const navigate = useNavigate()

    const { feedId } = useParams()
    // const { followingId } = useParams()

    const [feedData, setFeedData] = useState('')
    const [feedLike, setfeedLike] = useState(feedData.isLiked);
    const [likeList, setLikeList] = useState(false)
    const [likeListData, setLikeListData] = useState([])

    const token = useRecoilValue(loginState)

    console.log(feedData);

    const following = (idid) => {
        axios.post(`http://192.168.30.224:8080/api/follow/${idid}`, {} ,{
            headers: { Authorization: token },
        })
            .then((response => {
                console.log(response);
                axios.get(`http://192.168.30.224:8080/api/feed/${feedId}/like`, {
                    headers: { Authorization: token },
                })
                .then((response) => {
                    console.log(response.data.data);
                    setLikeListData(response.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
                
                
            }))
            .catch((err => {
                console.log(err);
            }))
    }


    useEffect(() => {
        axios
            .get(`http://192.168.30.224:8080/api/feed/${feedId}`,{
                headers: { Authorization: token },

            })
            .then ((response) => {
                console.log(response)
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
                .get(`http://192.168.30.224:8080/api/feed/${feedId}/like`, {
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

    

    
    // 좋아요 리스트 띄우는 모달창 flag
    const likeCount = () => {
        setLikeList ( prevLikeList => !prevLikeList
        )
    }
 

    useEffect(() => {
        if (likeList) {

        }
    },[likeList])

    // 피드를 좋아요 하는 함수
    const likeFeed = () => {
        axios.post(`http://192.168.30.224:8080/api/feed/${feedId}/like`, {} ,{
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
        axios.delete(`http://192.168.30.224:8080/api/feed/${feedId}/like`, {
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
   
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true
    }


 
    // const handleLikeClick = (feedId) => {
        
    //     setFeedData((prev) =>
        
    //         feedData.id === feedId ? { ...feedData, isLiked: !prev.isLiked,  likeCount: feedData.isLiked ? feedData.likeCount - 1 : feedData.likeCount + 1 } : feedData
    //       )
    
    //   };
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
                            <div onClick={() => navigate(`/feed/edit/${feedId}`, {state: {feedData}})}>...</div>
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
                                {user.isFollow ? (
                                    <div onClick = {() => following(user.id)}>
                                    <FollowButton text={"Following"}
                                    />
                                    </div>
                                ) : (
                                    <div onClick = {following(user.id)}>
                                    <FollowButton text={"Follow"}
                                    />
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