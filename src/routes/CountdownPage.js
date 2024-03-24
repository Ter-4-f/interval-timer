import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Timer from '../models/Timer';
import ProgressBar from '../components/ProgressBar';

const CountdownPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const minutes = searchParams.get("minutes"); // Retrieve minutes from URL params
    const seconds = searchParams.get("seconds");

    const [remainingTime, setRemainingTime] = useState(minutes * 60); // Convert minutes to seconds
    const [progressPercentage, setProgressPercentage] = useState(100);
    const [counter, setCounter] = useState(new Timer(minutes, seconds || 0));

    // Time
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Interval");
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
    }, []);

    // Progress
    useEffect(() => {
        const percentage = ((minutes * 60 - remainingTime) / (minutes * 60)) * 100;
        setProgressPercentage(percentage);
    }, [remainingTime, minutes]);

    const formattedCounter = () => {
        return `${counter.minutes}:${counter.seconds < 10 ? '0' : ''}${counter.seconds}`;
    };

    
    // Create gradient background style
    const progress = {
        // background: `linear-gradient(to bottom, ${darkGreen}, ${lightGreen}, ${lightBlue}, ${darkBlue})`,
        // background: `radial-gradient(circle, rgba(0,255,235,1) ${bluePercentage}%, rgba(61,255,0,1) ${greenPercent}%)`,
        // background: "rgb(34,139,34)",
        // background: `linear-gradient(90deg, rgba(34,139,34,1) ${progressPercentage -1}%, rgba(0,255,0,1) ${progressPercentage}%, rgba(34,139,34,1) ${progressPercentage +1}%)`,
        // 'background-image': 'url(data:image/png;base64,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)',
        
        background: "rgb(33,212,253)",
        background: `linear-gradient(90deg, rgba(33,212,253,0) ${progressPercentage -2}%, rgba(33,244,253,0.3) ${progressPercentage}%, rgba(33,212,253,0) ${progressPercentage +2}%)`, 


        width: `100%`,
        height: `100%`,
        display: "flex",
        'flexDirection': "column"
    };

    return (
        <div className='background-gradient max-size'>
            <div className="max-size" style={progress}>
                <div className='timer grower'>{formattedCounter()}</div>
                {/* <ProgressBar percentage={progressPercentage}/> */}
            </div>
        </div>
    );
};

export default CountdownPage;
