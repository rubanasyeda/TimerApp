import React, { useEffect, useRef, useState } from 'react';
import "./Timer.css";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countdownRef = useRef(null);

  const updateDisplay = (time) => {
    const hrs = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      countdownRef.current = setInterval(() => {
        setTotalTime((prevTime) => {
          if (prevTime <= 1000) {
            clearInterval(countdownRef.current);
            alert("Time's up!");
            setIsActive(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(countdownRef.current); // Cleanup interval on unmount
  }, [isActive, isPaused]);

  const startTimer = () => {
    const total = (hours * 3600 + minutes * 60 + seconds) * 1000;
    setTotalTime(total);
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    clearInterval(countdownRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTotalTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="countdown_timer">
      <div className='timer_container'>
        <div className='countdown_timer_container'>
          <div className="time-inputs">
            <h1>CountDown Timer</h1>
            <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} placeholder="HH" min="0" />
            <input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} placeholder="MM" min="0" max="59" />
            <input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} placeholder="SS" min="0" max="59" />
          </div>
          <div className="controls">
            <button onClick={startTimer} disabled={isActive} >Start</button>
            {isActive && (
              <button onClick={isPaused ? resumeTimer : pauseTimer}>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            )}
            <button onClick={resetTimer}>Reset</button>
          </div>
          <div className="display">
            <span>{updateDisplay(totalTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
