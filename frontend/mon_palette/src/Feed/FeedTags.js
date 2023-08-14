import React, { useState } from 'react';
import styles from './FeedTags.module.css';

const FeedTags = () => {
  const [tags, setTags] = useState('');
  const [tagList, setTagList] = useState([]);

  const handleChange = (e) => {
    setTags(e.target.value);
  };

  const handleAddTag = () => {
    setTagList((prevTags) => [...prevTags, tags]);
    setTags('');
  };

  return (
    <div className={styles["feed-tags"]}>
      <div className={styles["tag-input"]}>
        <textarea
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요..."
          className={styles.textarea}
        />
        <button className={styles.button} onClick={handleAddTag}>Add Tag</button>
      </div>
      <div className={styles["tag-list"]}>
        {tagList.map((tag, index) => (
          <div key={index} className={styles["tag-item"]}>
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedTags;
