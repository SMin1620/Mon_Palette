import React, { useState } from 'react';
import styles from './FeedImage.module.css';

const FeedImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (imageIndex) => {
    setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== imageIndex));
  };

  return (
    <div className={styles["feed-image"]}>
      <input type="file" accept="image/*" multiple onChange={handleFileChange} />
      <div className={styles["selected-images"]}>
        {selectedImages.map((image, index) => (
          <div key={index} className={styles["image-item"]}>
            <img src={URL.createObjectURL(image)} alt={`${index}`} />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedImage;
