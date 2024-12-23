import React, { useState } from 'react';
import PrepareScreen from './PrepareScreen';
import FinishScreen from './FinishScreen';
import { ActiveTimerScreen } from './TimerScreen';

const CountdownScreen = ({startTime, audio, muted, handleDone, onReset}) => {
    const [isPreparing, setPreparing] = useState(true);
    const [isFinished, setFinished] = useState(false);
    const [isPaused, setPaused] = useState(true);

    // Time
    function handleOnDone () {
        if (!muted) {
            audio.play();
        }
        setFinished(_ => true);
    }

    function handlePrepared () {
        setPreparing(_ => false);
        setPaused(_ => false);
        if (!muted) {
            audio.play();
        }
    }
    
    return (
        <div className='max-size'>
            {isPreparing
            ?   <PrepareScreen onDone={handlePrepared}/>
            :   <div className="max-size overlap">                                
                    { isFinished 
                    ?   <FinishScreen      seconds={startTime} isPaused={isPaused} onReset={onReset} onDone={handleDone}/>
                    :   <ActiveTimerScreen seconds={startTime} isPaused={isPaused} onReset={onReset} onCancel={handleDone} onDone={handleOnDone} />    
                    }
                </div>
            }            
        </div>
    );
};

export default CountdownScreen;
