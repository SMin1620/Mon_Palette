import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import styles from './AutoComplete.module.css'

const Autocomplete = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul className={styles.ul}>
      {suggestions.map((suggestion, index) => (
        <li key={index} className={styles.li} onClick={() => onSuggestionClick(suggestion.nickname)}>
          <img className={styles.img} src={suggestion.profileImage} />
          {suggestion.nickname}
        </li>
      ))}
    </ul>
  );
};
  
export default Autocomplete;
  