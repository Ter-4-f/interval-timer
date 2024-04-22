import React, { useState, useEffect } from 'react';
import PrepareScreen from './PrepareScreen';
import FinishScreen from './FinishScreen';
import Bell from '../audio/boxing-bell.mp3';
import { ActiveTimerScreen, BreakTimerScreen } from './TimerScreen';


const RoundHint = ({round, maxRounds}) => {
    return (
        <div className='round-hint'>
            {`${round}/${maxRounds}`}
        </div>
    );
}



const IntervalTimerScreen = ({timer, audio, handleDone, onReset}) => {
    const timeIsAnIllusion = timer;
    const [key, setKey] = useState("reloadKey");
    const [round, setRound] = useState(1);
    const [isPreparing, setPreparing] = useState(true);
    const [isFinished, setFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);
    

    function handlePrepared () {
        setPreparing(_ => false);
        setIsActive(_ => true);
        audio.play();
    }

    function handleOnDone () {
        audio.play();
        setIsActive(active => {
            setRound(prevRound => {
                if (active && prevRound >= timer.rounds) {
                    setFinished(_ => true);
                } else if (!active) {
                    return prevRound + 1;
                }
                return prevRound;
            });

            return !active;
        });
    }

    return (
        <div key={key} className='max-size'>
            {isPreparing
            ?   <PrepareScreen onDone={handlePrepared}/>
            :   isFinished
                ?   <FinishScreen onReset={onReset} onDone={handleDone} />
                :   isActive
                    ?   <ActiveTimerScreen seconds={timer.activeSeconds} onReset={onReset} onCancel={handleDone} onDone={handleOnDone} /> 
                    :   <BreakTimerScreen  seconds={timer.breakSeconds}  onReset={onReset} onCancel={handleDone} onDone={handleOnDone} /> 
            } 

            { !isPreparing ? <RoundHint round={round} maxRounds={timer.rounds} /> : null}            
        </div>
    );
};

export default IntervalTimerScreen;
