import React from 'react';
import './SearchResultFeed.css'
import { resultsState } from '../Search/Atom';
import { useRecoilValue } from 'recoil';


function SearchResultFeed() {
  const FeedData = [{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=996&t=st=1690267153~exp=1690267753~hmac=ce53bc8b87bfeb06776cc17f93e58ca92a6cbcb3ffd4104e48c830dac4ebe296',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=996&t=st=1690267153~exp=1690267753~hmac=ce53bc8b87bfeb06776cc17f93e58ca92a6cbcb3ffd4104e48c830dac4ebe296',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://img.freepik.com/free-photo/adorable-kitty-looking-like-it-want-to-hunt_23-2149167099.jpg?w=996&t=st=1690267153~exp=1690267753~hmac=ce53bc8b87bfeb06776cc17f93e58ca92a6cbcb3ffd4104e48c830dac4ebe296',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },{
    description: '설명설명설명설명설명설명설명설명설명설명설명설명',
    feedImg: 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MjhfMjQ3/MDAxNTI0ODgxODM2ODg4.qQGPRwKWHTgq1R2XIx2f5hNExkrL60L4xuB08IW5gC0g.Zbu_z7BSjkCeoCeylaV4QmMyHiBAIZSIN87H8ob3eLIg.JPEG.ichufs/IMG_8931s.jpg?type=w800',
    userId: 'jsw',
    personalColor: '봄 웜톤',
    userImg: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize'
  },]

  const results = useRecoilValue(resultsState);

  return (
    // <div className="search_result_feed_wrap">
    //   <div className="search_result_feed_container">
    //     {
    //       FeedData.map((data, index) => {
    //         return <div className="search_result_feed_item" key={index}>
    //           <img src={data.feedImg} alt="" className="search_result_feed_feedImg"/>
    //           <div className="search_result_feed_user">
    //             <div className="search_result_feed_user_left">
    //               <img src={data.userImg} alt="" className="search_result_feed_userImg" />
    //               <p>{data.userId}</p>
    //             </div>
    //             <p>{data.personalColor}</p>
    //           </div>
    //           <p>{data.description.slice(0, 10)} <span>...</span></p>
    //         </div>
    //       })
    //     }
    //   </div>
    // </div>
    <div>
      {
        results.map((data, index) => {
          return <div key={index}>
            <img src={data.feedImages.imagePath} />
            {data.content}
          </div>
        })
      }
    </div>
  );  
}

export default SearchResultFeed;