import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Autocomplete = ({ suggestions, onSuggestionClick }) => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => onSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Autocomplete;
  