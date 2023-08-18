import React , { useRef, useState, useEffect }  from "react";
import Header from "./Header/Header";
import FeedContent from "./FeedContent/FeedContent";
import Comment from "./Comment/Comment"

function FeedDetail() {
    return (
        <div>
            <Header />
            <FeedContent />
            <Comment />
        </div>
)}
export default FeedDetail;