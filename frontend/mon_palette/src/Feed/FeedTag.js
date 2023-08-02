import React, { useState } from 'react';
import './FeedTag.css'

const HashTags = ["# following1", "# Hot2", "# Recommend3", "# following4", "# Hot5", "# Recommend6", "# following7", "# Hot8", "# Recommend9", "# following10", "# Hot11", "# Recommend12", "# following13", "# Hot14", "# Recommend15asasdasdasdasd", "# following16", "# Hot17", "# Recommend18", "# following19", "# Hot20"]


function FeedTag(props) {
  return (
    // 저장된 태그 불러와서 반복문으로 돌려야 함
    <div className="feed_tags_container">
      <div className="feed_tags">
        {
          props.hashTags.map((tag, index) => {
            return <div className="feed_tag_item" onClick={
              () => {
                
              }
            } key={index}># {tag.hashTags}</div>
          })
        }
      </div>
    </div>
  );
}

export default FeedTag;