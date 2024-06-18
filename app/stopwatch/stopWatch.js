import { useState, useEffect } from "react";

const StopWatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [tens, setTens] = useState(0);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    setIntervalId(setInterval(updateTimer, 10));
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setMinutes(0);
    setSeconds(0);
    setTens(0);
    setLaps([]);
  };

  const updateTimer = () => {
    setTens((prevTens) => {
      let newTens = prevTens + 1;
      if (newTens > 99) {
        setSeconds((prevSeconds) => {
          let newSeconds = prevSeconds + 1;
          if (newSeconds > 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            newSeconds = 0;
          }
          return newSeconds;
        });
        newTens = 0;
      }
      return newTens;
    });
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  const recordLap = () => {
    const lapTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }.${tens < 10 ? `0${tens}` : tens}`;
    setLaps((prevLaps) => [...prevLaps, lapTime]);
  };

  return (
    <div className="text-center p-2">
      <p className="text-2xl font-medium mb-4">
        <span id="minutes">{minutes < 10 ? `0${minutes}` : minutes}</span> :
        <span id="seconds"> {seconds < 10 ? `0${seconds}` : seconds}</span> :
        <span id="tens"> {tens < 10 ? `0${tens}` : tens}</span>
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          className="px-8 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
          onClick={startTimer}
        >
          Start
        </button>
        <button
          className="px-8 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={stopTimer}
        >
          Stop
        </button>
        <button
          className="border border-blue-500 text-blue-500 px-8 py-2 rounded-md hover:bg-blue-500 hover:text-white"
          onClick={recordLap}
        >
          Record
        </button>
        <button
          className="border border-yellow-500 text-yellow-500 px-8 py-2 rounded-md hover:bg-yellow-500 hover:text-white"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-medium mb-2">Records</h2>
        <ul>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StopWatch;
