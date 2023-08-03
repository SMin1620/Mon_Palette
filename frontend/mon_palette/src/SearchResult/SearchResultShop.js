import React from 'react';
import './SearchResultShop.css'
import { resultsState } from '../Search/Atom';
import { useRecoilValue } from 'recoil';

function SearchResultShop() {
  const Results = useRecoilValue(resultsState);
  const ShopData = [{
    imgSrc: 'https://image.zdnet.co.kr/2021/10/28/c0f21e0abf1b83f3c1d9e0702aede342.jpg',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },{
    imgSrc: 'https://image.zdnet.co.kr/2021/10/28/c0f21e0abf1b83f3c1d9e0702aede342.jpg',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },{
    imgSrc: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },{
    imgSrc: 'https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },{
    imgSrc: 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MjhfMjQ3/MDAxNTI0ODgxODM2ODg4.qQGPRwKWHTgq1R2XIx2f5hNExkrL60L4xuB08IW5gC0g.Zbu_z7BSjkCeoCeylaV4QmMyHiBAIZSIN87H8ob3eLIg.JPEG.ichufs/IMG_8931s.jpg?type=w800',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },{
    imgSrc: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA5MDNfMjI1/MDAxNTY3NDk2Njg0Njkw.8dGjZUScsmW_ur0VNZM2YFcrpSQmPF1bkR3aQ-RQL20g.LA7dpU69NyB-r8ui7eeL60aGXPR-1-0yyHaECq8qomcg.PNG.kma_131/image.png?type=w800',
    title: 'title',
    description: '설명설명설명설명설명설명설명설명설명',
    cost: '1470000'
  },]
  

  return (
    <div className="search_result_shop_wrap">
      {
        ShopData.map((shopdata, index) => {
          return <div key={index} className="search_result_shop_item">
            <img src={shopdata.imgSrc} alt="" className="search_result_shop_shopImg"/>
            <div className="search_result_shop_shopTop">
              <h3>{shopdata.title}</h3>
              <p>{shopdata.description.slice(0,12)}</p>
            </div>
              <h3>{shopdata.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span>원</span></h3>
          </div>
        })
      }
    </div>
  ) 
}
export default SearchResultShop;