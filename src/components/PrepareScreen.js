import React, { useEffect, useState } from 'react';
import './Screens.css'; // CSS file for styling

const PrepareScreen = ({ onDone }) => {
    const [time, setTime] = useState(4);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime == 0) {
                    onDone();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="max-size prepare-screen">
            <div className='timer'>{time}</div>
        </div>
    );
};

export default PrepareScreen;
