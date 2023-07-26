import React, { useState } from 'react';
import FeedImage from './FeedImage';
import FeedCaption from './FeedCaption';
import FeedTags from './FeedTags';
import './FeedWrite.css';

const FeedWrite = () => {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);


  return (
    <div className="feed-form">
      <div className="header">
        <button>뒤로 가기</button>
        <h2>글 작성하기</h2>
        <button onClick="">업로드</button>
      </div>

      <FeedImage />

      <div className="caption">
        <FeedCaption caption={caption} setCaption={setCaption} />
      </div>

      <hr />

      <div className="tags">
        <h2># Tag</h2>
        <FeedTags tags={tags} setTags={setTags} tagList={tagList} setTagList={setTagList} />
      </div>
    </div>
  );
};

export default FeedWrite;
