import React from "react";
import Header from "./Feed/FeedDetail/Header/Header";
import FeedContent from "./Feed/FeedDetail/FeedContent/FeedContent";
import Comment from "./Feed/FeedDetail/Comment/Comment";

function App() {
  return (
    <div className="App">
      <Header />
      <FeedContent />
    
      <Comment />
    
    </div>
  );
}

export default App;
