import { useEffect, useState } from 'react';
import Timer from "./models/Timer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CountdownPage from './routes/CountdownPage';
import RootPage from './routes/RootPage';
import Bell from './audio/boxing-bell.mp3';


let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

export default function AAAA() {
    const [timerTime, setTimerTime] = useState(new Timer(20, 10));
    const [intervalTimerTime, setIntervalTimerTime] = useState(new Timer(20, 10));


    document.addEventListener('onCLick', (e) => console.log("Clicked ME uWu"));
    document.addEventListener('cLick', (e) => console.log("Clicked ME aWuuu"));
    document.addEventListener('touchstart', (e) => console.log("Clicked ME aWuuu"));


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



const AudioPlayer = () => {
    const [audioContext, setAudioContext] = useState(null);
    const [buffer, setBuffer] = useState(null);
    const [source, setSource] = useState(null);
  
    useEffect(() => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(audioCtx);
  
      const fetchData = async () => {
        // const response = await fetch('https://upload.wikimedia.org/wikipedia/commons/3/34/Sound_Effect_-_Door_Bell.ogg');
        const response = await fetch(Bell);
        const audioData = await response.arrayBuffer();
        const decodedData = await audioCtx.decodeAudioData(audioData);
        setBuffer(decodedData);
      };
  
      fetchData();
  
      return () => {
        if (source) {
          source.stop();
        }
        audioCtx.close();
      };
    }, []);
  
    const playSound = () => {
      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = buffer;
      sourceNode.connect(audioContext.destination);
      sourceNode.start();
      setSource(sourceNode);
    };
  
    return (
      <div>
        <button onClick={playSound}>Play Sound</button>
      </div>
    );
  };