import React, { useState } from 'react';
import { ReactComponent  as ResumeIcon } from '../icons/resume.svg';
import { ReactComponent  as PauseIcon } from '../icons/pause.svg';
import { ReactComponent  as ReloadIcon } from '../icons/reload.svg';
import { ReactComponent  as CancelIcon } from '../icons/x.svg';

const ActiveTimer = ({ isPaused, timer, handlePause, handleReset }) => {  
    const formattedCounter = () => {
        return `${timer.minutes}:${timer.seconds < 10 ? '0' : ''}${timer.seconds}`;
    };

    return (
        <div className="max-size centering">
            <div className='timer grower'>{formattedCounter()}</div>
            <div className="buttons-container">
                <PauseIcon className={`icon main-icon ${isPaused ? "invisible" : ""}`} onClick={handlePause} />

                <div className={`buttons ${isPaused ? "" : "invisible"}`}>
                    <CancelIcon className="icon" onClick={handlePause} />
                    <ResumeIcon className="icon main-icon" onClick={handlePause} />
                    <ReloadIcon className="icon" onClick={handleReset} />
                </div>
            </div>
        </div>
    );
};

export default ActiveTimer;
