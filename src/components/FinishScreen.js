import React, { useState } from 'react';
import { ReactComponent  as ReloadIcon } from '../icons/reload.svg';
import { ReactComponent  as CancelIcon } from '../icons/x.svg';
import './FinishScreen.css'; // CSS file for styling

const FinishScreen = ({ isPaused, timer, handleDone, handleReset }) => {  
    const formattedCounter = () => {
        return `${timer.minutes}:${timer.seconds < 10 ? '0' : ''}${timer.seconds}`;
    };

    return (
        <div className="max-size finish-screen">
            <div>
                <div className='timer'>Finished!</div>
                <div className="buttons-container">
                    <div className={`buttons`}>
                        <CancelIcon className="icon main-icon" onClick={handleDone} />
                        <ReloadIcon className="icon main-icon" onClick={handleReset} />
                    </div>
                </div>                
            </div>
        </div>
    );
};

export default FinishScreen;
