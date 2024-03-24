import React, { useState } from 'react';
import './GradientAnimation.css'; // CSS file for styling

const GradientAnimation = ({ isPaused }) => {  
  return (
    <div className="gradient-container">
      <div className={`gradient ${isPaused ? 'paused' : ''}`} />
    </div>
  );
};

export default GradientAnimation;
