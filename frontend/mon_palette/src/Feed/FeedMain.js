import React from 'react';
import FeedTag from './FeedTag'
import FeedWrite from './FeedWrite';

function FeedMain() {
  return (
    <div className="feedMain">
      <FeedTag />
      <h1>feed창</h1>

      <FeedWrite />

    </div>
  );
}

export default FeedMain;