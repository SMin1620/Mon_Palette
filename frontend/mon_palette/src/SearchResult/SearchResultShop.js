import React, {useEffect, useState, useRef} from 'react';
import styles from './SearchResultShop.module.css'
import { resultsState } from '../Search/Atom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginState } from 'src/user/components/Atom/loginState';
import { PropagateLoader } from 'react-spinners';

function SearchResultShop({ query }) {
  
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

  const navigate = useNavigate();
  const Authorization = useRecoilValue(loginState);
  const [resultData, setResultData] = useState([]);
  const [itemPage, setItemPage] = useState(0);
  const [load, setLoad] = useState(true);
  const endRef = useRef(false);
  const obsRef = useRef(null);

  const handleObs = (entries) => {
    const target = entries[0];
    if (!endRef.current && target.isIntersecting) {
        setItemPage((prevPage) => prevPage + 1);
    }
};

  const fetchUserData = async (page) => {
      try {
          const response = await axios.get(
              `${process.env.REACT_APP_API}/api/search?page=${page}&type=item&keyword=${query}`,
              {
                  headers: { Authorization: Authorization }
              }
          );
          if (response.data.data.item.length !== 10) {
              endRef.current = true;
              setLoad(false);
          }

          setResultData(prev => [...prev, ...response.data.data.item]);
          // console.log(resultData)
      } catch (error) {
          console.error(error);
      }
  };


  useEffect(() => {
      fetchUserData(0);  
      setResultData([]);
  }, [query]);

  useEffect(() => {
      if (itemPage > 0) {  
          fetchUserData(itemPage);
      }

      const observer = new IntersectionObserver(handleObs, { threshold: 0.5 });
      if (obsRef.current) observer.observe(obsRef.current);

      return () => { observer.disconnect(); }; 
  }, [itemPage]);


  const goDetail = (id) => {
    navigate(`/item/${id}`)
  }

  return (
    <div className={styles["search_result_shop_wrap"]}>
      {
        resultData && resultData.length >0 && resultData.map((shopdata, index) => {
          const originalPrice = shopdata.price;
          const discountedPrice = shopdata.price - (shopdata.price * (shopdata.discount / 100));
          return <div key={index} className={styles["search_result_shop_item"]} onClick={ () => goDetail(shopdata.id) }>
            <img src={shopdata.thumbnail} alt="" className={styles["search_result_shop_shopImg"]}/>
            <div className={styles["search_result_shop_shopTop"]}>
              <h3>{shopdata.name}</h3>
              <p>{(shopdata.content || "설명설명설명설명설명설명").slice(0,12)}</p>
            </div>
            <div className={styles["price_section"]}>
              <span className={styles["original_price"]}>
                {originalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </span>
              <h3 className={styles["discounted_price"]}>
                {discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </h3>
            </div>
          </div>
        })
      }
      {load ? 
          <div className={styles["observer_spinner"]} ref={obsRef}>
              <PropagateLoader color='#fdf2f7'/>
          </div>
          :
          <div ref={obsRef}></div>
      }
    </div>
  ) 
}
export default SearchResultShop;