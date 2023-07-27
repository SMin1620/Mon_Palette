import React, { useState } from 'react';
import FeedImage from './FeedImage';
import FeedCaption from './FeedCaption';
import FeedTags from './FeedTags';
import styles from './FeedWrite.module.css';

const FeedWrite = () => {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);


  return (
    <div className={styles["feed-form"]}>
      <div className={styles.header}>
        <button>뒤로 가기</button>
        <h2>글 작성하기</h2>
        <button onClick="">업로드</button>
      </div>

      <FeedImage />

      <div className={styles.caption}>
        <FeedCaption caption={caption} setCaption={setCaption} />
      </div>

      <hr />

      <div className={styles.tag}>
        <h2># Tag</h2>
        <FeedTags tags={tags} setTags={setTags} tagList={tagList} setTagList={setTagList} />
      </div>
    </div>
  );
};

export default FeedWrite;
