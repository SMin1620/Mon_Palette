import React, {useState} from 'react';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import styles from './RecommendYoutuber.module.css';
import { useNavigate } from 'react-router-dom';


const YOUTUBERS = {
  spring: [
    { name: "유앤아인", imageUrl: "https://yt3.googleusercontent.com/ytc/AOPolaRXn5fS-zpfsIDHxc4FqtPrUmVSGP_kiRO5_6pAH1Y=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@youandain8479"  },
    { name: "령령", imageUrl: "https://yt3.googleusercontent.com/ytc/AOPolaQC4r4bovVJ-DAnyoCsMWJhzXPA9qRzwxatELgsgA=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@ryeong___eee" },
    { name: "영기티비", imageUrl: "https://yt3.googleusercontent.com/ytc/AOPolaRzx4ekfaLsw1Z2z-rxVmrhOFZ1HjRucXRZ2uJM=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@user-pz8ht9tu8v" },
    { name: "윤이든", imageUrl: "https://yt3.googleusercontent.com/ytc/AOPolaTlHZlEbWDnJm03Bhh1r6VbhwGkrjVBuIB77B7PEg=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@Youneed" },
    { name: "채니", imageUrl: "https://yt3.ggpht.com/RHmzYwGw5brE2dyjVzylEAAn4QK2PnAANZa72FxYB0bWI60YZUAjynZYvvAttkiegFpg3SI4=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@chaeny_1121" },
    { name: "민스코", imageUrl: "https://yt3.ggpht.com/J-J5VPXm8UZxFdAzgLod18tLhFHnT6hXdjQF73gVHe5Hsl2uVCPVNUCBlEg1P6LgG0yaLLgpbQ=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@minsco_" },
  ],
  summer: [
    { name: "민카롱", imageUrl: "https://yt3.ggpht.com/SbmZxDuyHq0I4abZFXnY1AnT5wAUgSv1t5_5l0HOCHhhLRjfgRitW2C3IcS3gNsxOQ1nlszuvg=s176-c-k-c0x00ffffff-no-rj-mo", url : "https://www.youtube.com/@mincarong" },
    { name: "우정", imageUrl: "https://yt3.ggpht.com/r_N_g63hunvUtQJRc7q-ji5xQ6yJseJlaIosupxKIalF33HsvKC3a3E9gCZ_l7UeBlXt6PXHNw=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@bfship" },
    { name: "아름하다", imageUrl: "https://yt3.ggpht.com/F4-YRjulVxaWUSn_cl-J99ceV5XjTp2dpD0BOy0fKRTfTQTkfxt_bE0SLo8mWCVZmMGJE2nGHA=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@iamarxmi" },
    { name: "수앤유", imageUrl: "https://yt3.ggpht.com/1ggmCGDSmQCGvbYF1BjjTMLJCVssbxkNbSBZ8Fk_yJ6jTKQqPZC4BQEe5mYDHr6WmBCU57WX=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@Sooandyou" },
    { name: "김크리스탈", imageUrl: "https://yt3.ggpht.com/ZMFYJ1o-VahR0yULPkqPlojpQ9P07jz54meNEgyMP91BRZXPdwE-2_pRk2hQO2kcqcs_2D9VyA=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@kimcrysta1" },
    { name: "태리태리", imageUrl: "https://yt3.ggpht.com/BSpqXPq0UGAnRugkS36R4AOttne7IsOe-qKxw6grOC8ee23cmVEmjVWmX-AwFwZ5rf5zIZUcSv8=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@taeri_taeri" },
    { name: "맨지", imageUrl: "https://yt3.ggpht.com/3RglB3sJh6WzYkELJeY-fJfZEx5VLMkw7stAO-6TwsK1ALeBkf6A8CZaxapnW0HoV-oP-_MGlV4=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@manzzi" },
  ],
  fall: [
    { name: "하네", imageUrl: "https://yt3.ggpht.com/tJuImT_OSCtrcKT_2YcYzUwq4-UzPWwDSgq0r_Qsla-35Pn4fSQk_DPN2osfznd7sOQUH1cYoQ=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@hane55" },
    { name: "안다", imageUrl: "https://yt3.ggpht.com/XTg2WHya7duXvuzorkHBoMMP4AAP-d_9qlnabuzqyMybRiPMRDyCQYio9Y3KwVNZuAoGBKCe=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@ANDA" },
  ],
  winter: [
    { name: "조효진", imageUrl: "https://yt3.ggpht.com/Ow0qqk3pdhOxzmgNLglfiMyqehXu8spDDH_WWvsWdmPxMtM5PGZR-baRP0mM2wLw9gfKTUBcg-I=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@hyojin94517" },
    { name: "핑글", imageUrl: "https://yt3.ggpht.com/zbSC4a6cOZkesu8DgI55LW71YlExBIXasXcRGR6RIts-rAxuVUkZkOd7XCpiVH7VIav4yGjyrA=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@Pinkjjelly" },
    { name: "하영필름", imageUrl: "https://yt3.ggpht.com/0ank_ltOm5QsOVIdg94NBPBqXuAGJeDaO-QuBPY7J1K-vJDRUB3zAyBjaaDEXbfUd790TuNenw=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@shyfilms" },
    { name: "레오제이", imageUrl: "https://yt3.googleusercontent.com/ytc/AOPolaSIXpd4S8TK7-J8BgacpPu2wlOkf-gqBy1ZSm_0LA=s176-c-k-c0x00ffffff-no-rj-mo", url: "https://www.youtube.com/@LeoJMakeup" },
  ],
};


  const RecommendYoutuber = () => {
    const [currentSeason, setCurrentSeason] = useState('spring');
    const navigate = useNavigate('')

    return (
        <div className={styles.container}>
            <div className={styles.header}>
      <ArrowBackOutlinedIcon sx={{ fontSize:20 }} className={styles.back} onClick={()=>{navigate('/home')}}/>
      <div>유튜버 추천</div>
      </div>
      <div className={styles.tabs}>
        {Object.keys(YOUTUBERS).map(season => (
          <button key={season} className={`${styles.button} ${currentSeason === season ? styles.active : ''}`} onClick={() => setCurrentSeason(season)}>
            {season}
          </button>
        ))}
      </div>

      <ul className={styles.ul}>
        {YOUTUBERS[currentSeason].map(youtuber => (
          <li key={youtuber.name} onClick={()=>window.location.href = youtuber.url} className={styles.li}>
            <img src={youtuber.imageUrl} className={styles.img} />
            <div className={styles.name}>{youtuber.name}</div>
          </li>
        ))}
      </ul>
    </div>
    );
};

export default RecommendYoutuber;