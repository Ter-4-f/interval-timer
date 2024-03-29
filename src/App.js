import { useState } from 'react';
import Timer from "./models/Timer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CountdownPage from './routes/CountdownPage';
import RootPage from './routes/RootPage';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export default function AAAA() {
    const [timerTime, setTimerTime] = useState(new Timer(20, 10));
    const [intervalTimerTime, setIntervalTimerTime] = useState(new Timer(20, 10));


    return (
        <Router>
          
            <Routes>
                <Route path="/countdown" element={<CountdownPage />} />
                <Route path="/root" element={<RootPage />} />
                <Route path="/" element={<Square timer={timerTime} />} />
                {/* <Route path="*" element={<NotFound/>}/> */}
                {/* Add other routes here if needed */}
            </Routes>
          
        </Router>
      );
}

export function Square({ timer }) {
    return (
        <>
            <button className="square">X</button>
            <TimerRender value={timer} />
            <Timer />
        </>
    );
}
 
export function TimerRender({ value }) {
    function handleClick () {

    }

    return (
        <button className="selection" onClick={handleClick}>
            <p>Timer</p>
            <div className="grower"></div>
            <p className="time">{value.minutes}:{value.seconds}</p>
        </button>
    );
}

export function IntervalTimer() {
    return (
        <button className="selection">
            <p>Interval</p>
            <div className="grower"></div>
            <p className="time">20:00</p>
        </button>
    );
}