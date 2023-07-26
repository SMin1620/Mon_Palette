import React, { useState } from 'react';
import './FeedTags.css';

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
    <div className="feed-tags">
      <div className="tag-input">
        <textarea
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="태그를 입력하세요..."
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
      <div className="tag-list">
        {tagList.map((tag, index) => (
          <div key={index} className="tag-item">
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedTags;
