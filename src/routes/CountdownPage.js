import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Timer from '../models/Timer';
import GradientAnimation from '../components/GradientAnimation';
import { ReactComponent  as ResumeIcon } from '../icons/resume.svg';
import { ReactComponent  as PauseIcon } from '../icons/pause.svg';
import { ReactComponent  as ReloadIcon } from '../icons/reload.svg';
import { ReactComponent  as CancelIcon } from '../icons/x.svg';

const CountdownPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const minutes = parseInt(searchParams.get("minutes") || 0); // Retrieve minutes from URL params
    const seconds = parseInt(searchParams.get("seconds") || 0);
    const maxTime = minutes * 60 + seconds;

    const [isPaused, setPaused] = useState(false);
    const [remainingTime, setRemainingTime] = useState(maxTime); // Convert minutes to seconds
    const [progressPercentage, setProgressPercentage] = useState(100);
    const [counter, setCounter] = useState(new Timer(minutes, seconds));

    // Time
    useEffect(() => {
        const interval = setInterval(() => {
            if (isPaused) return;
            
            setRemainingTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });

            setCounter(prevCounter => prevCounter.decrement());
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    // Progress
    useEffect(() => {
        const percentage = ((minutes * 60 - remainingTime) / (minutes * 60)) * 100;
        setProgressPercentage(percentage);
    }, [remainingTime, minutes]);

    const formattedCounter = () => {
        return `${counter.minutes}:${counter.seconds < 10 ? '0' : ''}${counter.seconds}`;
    };

    const handlePause = () => {
        setPaused(prev => !prev);
    };

    function reset() {
        // reset animation
        var el = document.getElementById('gradiant-animation');
        el.classList.remove("gradient");
        setTimeout(() => {
            el.classList.add("gradient");
          }, 10);

        // reset timer
        setRemainingTime(prevTime => maxTime);
        setCounter(prevCounter => new Timer(minutes, seconds));
    }

    
    const progress = {
        width: `100%`,
        height: `100%`,
        display: "flex",
        'flexDirection': "column"
    };

    return (
        <div className='background-gradient max-size'>
            <GradientAnimation isPaused={isPaused} time={maxTime}></GradientAnimation>
            <div className="max-size overlap" style={progress}>
                <div className='timer grower'>{formattedCounter()}</div>
                <div className="buttons-container">
                    <PauseIcon className={`icon main-icon ${isPaused ? "invisible" : ""}`} onClick={handlePause} />

                    <div className={`buttons ${isPaused ? "" : "invisible"}`}>
                        <CancelIcon className="icon" onClick={handlePause} />
                        <ResumeIcon className="icon main-icon" onClick={handlePause} />
                        <ReloadIcon className="icon" onClick={reset} />
                    </div>
                </div>



                
                {/* <ProgressBar percentage={progressPercentage}/> */}
            </div>
        </div>
    );
};

export default CountdownPage;
