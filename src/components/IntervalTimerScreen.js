import React, { useState } from 'react';
import PrepareScreen from './PrepareScreen';
import FinishScreen from './FinishScreen';
import { ActiveTimerScreen, BreakTimerScreen } from './TimerScreen';


const RoundHint = ({round, maxRounds}) => {
    return (
        <div className='round-hint'>
            {`${round}/${maxRounds}`}
        </div>
    );
}



const IntervalTimerScreen = ({timer, audio, muted, handleDone, onReset}) => {
    const [round, setRound] = useState(1);
    const [isPreparing, setPreparing] = useState(true);
    const [isFinished, setFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);
    

    function handlePrepared () {
        setPreparing(_ => false);
        setIsActive(_ => true);
        if (!muted) {
            audio.play();
        }
    }

    function handleOnDone () {
        if (!muted) {
            audio.play();
        }
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
        <div className='max-size'>
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
