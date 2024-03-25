import React, { useState } from 'react';
import './GradientAnimation.css'; // CSS file for styling

const GradientAnimation = ({ isPaused, time }) => {  
    const animation = {
        'animationDuration': `${time}s`
    };

    return (
        <div className="gradient-container">
            <div id="gradiant-animation" className={`gradient ${isPaused ? 'paused' : ''}`} style={animation} />
        </div>
    );
};

export default GradientAnimation;
