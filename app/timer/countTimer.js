import React, { useState, useEffect } from 'react';

const CountTimer = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, time]);

  const handleStart = () => {
    let inputTimeInSeconds = 0;
    const matches = inputTime.match(/(\d+h)?(\d+m)?(\d+s)?/);

    if (matches) {
      const [, hours, minutes, seconds] = matches;
      inputTimeInSeconds =
        (parseInt(hours?.slice(0, -1) || '0') * 3600) +
        (parseInt(minutes?.slice(0, -1) || '0') * 60) +
        (parseInt(seconds?.slice(0, -1) || '0'));
    } else {
      inputTimeInSeconds = parseInt(inputTime);
    }

    setTime(inputTimeInSeconds);
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setTime(0);
    setInputTime('');
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <label className="mb-2 text-xl">Enter time (e.g., 1h2m3s, 90m, 5400s)</label>
      <input
        type="text"
        placeholder="1h2m3s, 90m, 5400s"
        value={inputTime}
        onChange={(e) => setInputTime(e.target.value)}
        className="mb-4 px-4 py-2 border bg-black text-center border-gray-300 rounded"
      />
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${isRunning ? 'bg-green-500' : 'bg-blue-500 text-white'}`}
        >
          Start
        </button>
        <button
          onClick={handlePause}
          disabled={!isRunning}
          className={`px-4 py-2 rounded ${isPaused ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleReset}
          disabled={!isRunning && time === 0}
          className={`px-4 py-2 rounded ${!isRunning && time === 0 ? 'bg-white text-black' : 'bg-purple-500 text-white'}`}
        >
          Reset
        </button>
      </div>
      <div className="text-4xl font-bold mt-4">{formatTime(time)}</div>
    </div>
  );
};

export default CountTimer;