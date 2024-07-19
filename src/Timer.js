import React, { useEffect, useState } from 'react';
import "./Timer.css";

const Timer = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const deadline = "July, 28, 2024";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  let interval = setInterval(() => getTime(deadline), 1000);


  useEffect(() => {
    return () => clearInterval(interval);
  }, [interval]);

  const Reset=()=>{
    clearInterval(interval);
    interval = setInterval(() => getTime(deadline), 1000);

  }

  return (
    <div className="countdown_timer">
      <div className='container'>
        <div className='countdown_timer_container'>
      <h1>Countdown Timer</h1>
      <h1>{days}:{hours}:{minutes}:{seconds}</h1>

      <button className='Pause' >{seconds<10?"Pause":"Resume"}</button>
      <button className='Reset' onClick={Reset}>Reset</button>
      <button className='Restart'> Start </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;