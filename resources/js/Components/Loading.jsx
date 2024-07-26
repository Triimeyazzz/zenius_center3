// resources/js/Components/Loading.jsx
import React from 'react';
import './Loading.css'; // Pastikan untuk membuat file CSS terpisah

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default Loading;
