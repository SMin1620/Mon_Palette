import React, { useState } from 'react';

const FeedCaption = () => {
  const [caption, setCaption] = useState('');

  return (
    <div className="feed-caption">
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="피드에 추가할 캡션을 입력하세요..."
      />
    </div>
  );
};

export default FeedCaption;
