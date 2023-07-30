import React from 'react';
import FeedTag from './FeedTag'
import './FeedMain.css'


function FeedMain() {
  const AllChallengeImage = [
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s',
    'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s',
    'https://cdn.autotribune.co.kr/news/photo/202304/8017_43246_1529.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s',
    'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/IU_at_Sony_new_product_launching_event%2C_20_September_2017_05.jpg',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbvWLKz993UWxYqdnHM09YKO3d1nbYuoExzd_k2Scnvw&s',
    'https://cdn.newsculture.press/news/photo/202305/524104_647160_2237.jpg',
  ]
  return (
    <div className="feedMain">
      <FeedTag />
      <div className="feedMain_body">
        <div className="feedMain_body_info">
            <div className="feedMain_body_container">
              {
                AllChallengeImage.map((challengeInfo, index) => {
                  return <div className="feedMain_body_info_item" key={index}>
                    <img src={challengeInfo} alt="" />
                  </div>
                })
              }
            </div>
        </div>
    </div>
    </div>
  );
}

export default FeedMain;