import React, { useCallback, useState } from 'react';
import './Picker.css'; // Import your CSS file for styling


const callbackDelayer = {
    timer: null,
    callback: null,
    value: null,
  
    onChange(value) {
        if (value !== this.value) {
            this.value = value;
            if (!this.timer) {
                this.timer = setTimeout(() => {this.executeAfterDelay();}, 250);
            }
        }
    },
  
    executeAfterDelay() {
      this.callback(this.value);
      clearInterval(this.timer);
      this.timer = null;
    }
  };

const ScrollPicker = ({ value: startValue, formatter, scrollStep, onChange, min, max }) => {
  const [startY, setStartY] = useState(null);
  const [scrollStartValue, setScrollStartValue] = useState(startValue);
  const [curentValue, setCurrentValue] = useState(startValue);
  callbackDelayer.callback = onChange;

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setScrollStartValue(curentValue);
  };

  const handleTouchMove = (e) => {
    if (startY !== null) {
      const deltaY = startY - e.touches[0].clientY;
      const sensitivity = 10; // Adjust this value for sensitivity of swipe
      const deltaValue = Math.round(deltaY / sensitivity) * scrollStep;
      const newValue = Math.min(Math.max(scrollStartValue + deltaValue, min), max);
      callbackDelayer.onChange(newValue);
      setCurrentValue(newValue);
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };

  const divRefCallback = useCallback(
    (node) => {
      if (node == null) {
        return;
      }
      node.addEventListener('wheel', (e) => {
        const delta = Math.sign(e.deltaY) * -scrollStep;
        const newValue = Math.min(Math.max(curentValue + delta, min), max);
        setCurrentValue(newValue);
        onChange(newValue);
        e.preventDefault()
    }, { passive: false });
    },
    [curentValue, min, max, onChange, scrollStep],
  );

  return (
    <div
        className="picker"
        ref={divRefCallback}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
    >
      <span className="number">{formatter(curentValue)}</span>
    </div>
  );
};

export const NumberPicker =  ({ value: startValue, onChange, min, max }) => {
    const formatter = (value) => {
        return value;
    }
    return (
        <ScrollPicker value={startValue} formatter={formatter} scrollStep={1} onChange={onChange} min={min} max={max}/>
    )
};

export const TimerPicker =  ({ value: startValue, onChange, min, max }) => {
    const formatter = (value) => {
        let minutes = Math.floor(value / 60);
        let remainder = value % 60;
        if (minutes < 10) 
            minutes = '0' + minutes;
        if (remainder === 0) 
            remainder = '00';
    
        return `${minutes}:${remainder}`;
    }
    return (
        <ScrollPicker value={startValue} formatter={formatter} scrollStep={10} onChange={onChange} min={min} max={max}/>
    )
};
