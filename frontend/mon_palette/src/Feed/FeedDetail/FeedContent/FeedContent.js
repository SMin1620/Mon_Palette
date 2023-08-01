import React, { useRef,useState, useEffect, useParams } from "react";
import styles from "./FeedContent.module.css"
import { HeartOutlined, HeartFilled , CommentOutlined } from '@ant-design/icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios"
import Modal from "../../../Modal/Modal";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../user/components/Atom";





function FeedContent() {
    // const feedId = useParams()
    const feedId = 1
    const [feedData, setFeedData] = useState('')
    const [feedLike, setfeedLike] = useState(feedData.isLiked);
    const [likeList, setLikeList] = useState(false)
    const token = useRecoilValue(loginState)

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

    
    // 좋아요 리스트 띄우는 모달창 flag
    const likeCount = () => {
        setLikeList ( prevLikeList => !prevLikeList
        )
    }
    console.log('likelist', likeList);

    useEffect(() => {
        if (likeList) {

        }
    },[likeList])

    // 피드를 좋아요 하는 함수
    const likeFeed = () => {
        axios.post(`http://192.168.30.224:8080/api/feed/${feedId}/like`, {},{
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
 
    const handleLikeClick = (feedId) => {
        
        setFeedData((prev) =>
        
            feedData.id === feedId ? { ...feedData, isLiked: !prev.isLiked,  likeCount: feedData.isLiked ? feedData.likeCount - 1 : feedData.likeCount + 1 } : feedData
          )
    
      };
    return (
        <div className={styles.container}>
                <div className={styles.feed}>
                    <div className="feed_wrapper">
                    <Slider {...settings}>
                    {
                        feedData&& feedData.feedImages.map((image, index) => (
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
                        </div>

                    </div>
                    <p 
                    className={styles.content}>{feedData.content}</p>
                    
            
                 </div>
                 <div className={`${styles.page} ${likeList ? styles.open : ''}`}>
                            좋아요 누른 유저 보여줄 창
                            유저목록
                            map 써서 반복시켜서 아래로 쭉 보여줄거
                        </div>

            
         </div>
    )
    
}

export default FeedContent;