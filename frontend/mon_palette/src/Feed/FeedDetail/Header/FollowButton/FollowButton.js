import React from "react";
import styles from "./FollowButton.module.css"

function FollowButton({text}) {
    return <button className={ styles.btn }>{text}</button>
}

export default FollowButton;