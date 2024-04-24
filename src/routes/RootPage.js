import React, { useState } from 'react';
import TimerPicker from '../components/TimerPicker';
import { formatTimer } from '../utils/TimeUtils';
import './RootPage.css';
import Timer from '../models/Timer';
import NumberPicker from '../components/NumberPicker';
import CountdownScreen from '../components/CountdownScreen';
import IntervalTimerScreen from '../components/IntervalTimerScreen';
import Bell from '../audio/boxing-bell.mp3';
import nosleep from 'nosleep.js';

const storedTime = localStorage.getItem("timeTime") || 0;
const storedIntervalTimer = localStorage.getItem("intervalTimerTime");
const intervalTimer = storedIntervalTimer ? Timer.from(JSON.parse(storedIntervalTimer)) : new Timer();
var noSleep = new nosleep();

const RootPage = () => {
    const [initClick, setInitClick] = useState(false);
    const [timeSceenVisible, setTimeSceenVisible] = useState(window.location.hash && window.location.hash.substring(1) === "timer");
    const [intervalTimeSceenVisible, setIntervalTimeSceenVisible] = useState(window.location.hash && window.location.hash.substring(1) === "interval");
    const [timer, setTimer] = useState(parseInt(storedTime));
    // eslint-disable-next-line no-unused-vars
    const [_, setIntervalMaxTime] = useState(intervalTimer.getTotalTime()); // used to update display
    const [showTimer, setShowTimer] = useState(false);
    const [showIntervalTimer, setShowIntervalTimer] = useState(false);
    const [resetKey, setResetKey] = useState("Key");

    
    if (noSleep.enabled) {        
        noSleep.disable();
    }
    
    
    const handleClickTimer = () => {
        setShowTimer(prev => !prev);
        setShowIntervalTimer(_ => false);
    };

    const handleClickIntervalTimer = () => {
        setShowTimer(_ => false);
        setShowIntervalTimer(prev => !prev);
    };

    const handleDone = () => {
        setTimeSceenVisible(_ => false);
        setIntervalTimeSceenVisible(_ => false);
        // history.pushState("", document.title, window.location.pathname + window.location.search);
        // window.open(`/`,"_self");
    };

    function handleReset () {
        setResetKey(prev => prev += "I");
    };

    var audio = new Audio(Bell);
    audio.volume = 0.1;
    audio.addEventListener('play', () => {
        if (!initClick) {
            audio.pause();
        }
    }, false);

    function initAudio() {        
        if (!initClick) {
            // Start playing audio when the user clicks anywhere on the page,
            // to force Mobile Safari to load the audio.
            audio.play();
            setInitClick(true);
        }
    }

    return (
        <div className='screen' id="screen" onClick={initAudio}>
            { timeSceenVisible || intervalTimeSceenVisible ? "" :
            <div className='screen background'>
                <button className='selection' onClick={handleClickTimer}>
                    <span>Timer</span>
                    <div className="grower"></div>
                    <span className="time">{formatTimer(timer)}</span>             
                </button>
                {showTimer ? <TimerConfig setTime={setTimer} time={timer} setTimeSceenVisible={setTimeSceenVisible}/>: null}
                <button className='selection' onClick={handleClickIntervalTimer}>
                    <span>IntervalTimer</span>
                    <div className="grower"></div>
                    <span className="time">{formatTimer(intervalTimer.getTotalTime())}</span>             
                </button>
                {showIntervalTimer ? <IntervalTimerConfig intervalTimer={intervalTimer} setMaxTime={setIntervalMaxTime} setIntervalTimeSceenVisible={setIntervalTimeSceenVisible} />: null}
                {!showIntervalTimer && !showTimer ? <button className='selection' onClick={() => window.open(`/clock`,"_self")}><span>Clock</span><div className="grower"></div></button> : null}
            </div>
            }
            { timeSceenVisible ?         <CountdownScreen     key={resetKey} startTime={timer}     audio={audio} handleDone={handleDone} onReset={handleReset} /> : ""}
            { intervalTimeSceenVisible ? <IntervalTimerScreen key={resetKey} timer={intervalTimer} audio={audio} handleDone={handleDone} onReset={handleReset} /> : ""}
        </div>
    );
};


const TimerConfig = ({time, setTime, setTimeSceenVisible}) => {
    const handleChange = (newValue) => {
        setTime(_ => newValue);
    }

    const onStart = () => {
        localStorage.setItem("timeTime", time);
        // window.open(`/#timer`,"_self");
        setTimeSceenVisible(_ => true);
        noSleep.enable();
    }
    
    return (
        <div className='config'>
            <div className='wrapper'>
                <TimerPicker value={time} onChange={handleChange} min={0} max={3600} />
                <button className='start-button' onClick={onStart}>Start</button>            
            </div>
        </div>
    );
};


const IntervalTimerConfig = ({intervalTimer, setMaxTime, setIntervalTimeSceenVisible}) => {
    const handleChangeRounds = (newValue) => {
        intervalTimer.rounds = newValue;
        setMaxTime(_ => intervalTimer.getTotalTime());
    }
    const handleChangeRoundSeconds = (newValue) => {
        intervalTimer.activeSeconds = newValue;
        setMaxTime(_ => intervalTimer.getTotalTime());
    }
    const handleChangeBreakSeconds = (newValue) => {
        intervalTimer.breakSeconds = newValue;
        setMaxTime(_ => intervalTimer.getTotalTime());
    }

    const onStart = () => {
        localStorage.setItem("intervalTimerTime", JSON.stringify(intervalTimer));
        // window.open(`/#interval`,"_self");
        setIntervalTimeSceenVisible(_ => true);
        noSleep.enable();
    }
    
    return (
        <div className='config'>
            <div className='wrapper'>
                <table>
                    <tbody>
                        <tr><td>Round Time</td><td><TimerPicker value={intervalTimer.activeSeconds} onChange={handleChangeRoundSeconds} min={10} max={3600} /></td></tr>
                        <tr><td>Break Time</td><td><TimerPicker value={intervalTimer.breakSeconds} onChange={handleChangeBreakSeconds} min={10} max={3600} /></td></tr>
                        <tr><td>Rounds</td><td><NumberPicker value={intervalTimer.rounds} onChange={handleChangeRounds} min={2} max={99} /></td></tr>
                    </tbody>
                </table>
                <button className='start-button' onClick={onStart}>Start</button>            
            </div>
        </div>
    );
};


export default RootPage;
