import React, { useEffect, useRef, useState } from 'react';
import "./stopwatch.css";

const Stopwatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timeRef = useRef(null);

  useEffect(()=>{
    return () => clearInterval(timeRef.current);
  }, []);

  const startWatch = () => {
    if(timeRef.current) return;

    timeRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if(prevSeconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  const restartWatch=()=>{
    clearInterval(timeRef.current);
    setSeconds(0);
    setMinutes(0);
    timeRef.current = null;
    startWatch();
  }

  const stop =()=>{
    clearInterval(timeRef.current);
    timeRef.current = null;
  }

  return (
    <div className="stopwatch_timer">
      <div className='container'>
      <div className='stopwatch_timer_container'>
        <h1>Stopwatch</h1>
        <h1>{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h1>

        <button className='restart' onClick={restartWatch}>{seconds>0?"Restart":"Start"}</button>
        <button className='stop' onClick={stop}>Stop</button>
      </div>
      </div>
    </div>
  );
};

export default Stopwatch;