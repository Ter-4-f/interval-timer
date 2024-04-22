import React, { useState, useEffect } from 'react';
import './Clock.css';
import nosleep from 'nosleep.js';


function formatTime () {
    const date = new Date();
    return `${date.getHours() < 10 ? " " : ""}${date.getHours()}:${date.getMinutes() < 10 ? " " : ""}${date.getMinutes()}`;
}

var noSleep = new nosleep();

const Clock = () => {
    new Date();
    const [time, setTime] = useState(formatTime());
    const [keepOn, setKeepOn] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            
            setTime(formatTime());
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleLock = () => {
        if (keepOn)
            noSleep.disable();
        else
            noSleep.enable();
        setKeepOn(prev => !prev);
    };

    return (
        <div className='screen'>
            <div className='screen clock-background'>
                <div className='clock-time'>{time}</div>
                <button className='lock' onClick={handleLock}>{keepOn ? "sleep" : "lock"}</button>
            </div>
        </div>
    );
};

export default Clock;
