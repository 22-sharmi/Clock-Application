import { useState, useEffect } from "react";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    setIntervalId(setInterval(updateTimer, 1000));
  };

  const stopTimer = () => {
    clearInterval(intervalId);
  };

  const resetTimer = () => {
    clearInterval(intervalId);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const updateTimer = () => {
    setSeconds((prevSeconds) => {
        let newSeconds = prevSeconds - 1;

        if (newSeconds < 0 && (hours > 0 || minutes > 0)) {
            if (minutes === 0) {
                setHours((prevHours) => prevHours - 1);
                setMinutes(59);
            } else {
                setMinutes((prevMinutes) => prevMinutes - 1);
            }
            return 59;
        } else if (newSeconds < 0) {
            clearInterval(intervalId);
            setHours(0);
            setMinutes(0);
            return 0;
        }

        return newSeconds;
    });
};


  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="text-center p-2">
      <div className="text-2xl font-medium mb-4">
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(parseInt(e.target.value))}
          className="bg-black mr-2 w-20 text-center"
        />
        :
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
          className="bg-black mx-2 w-20 text-center"
        />
        :
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
          className="bg-black ml-2 w-20 text-center"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          className="col-span-2 px-8 py-2 rounded-md border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
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
          className="border border-yellow-500 text-yellow-500 px-8 py-2 rounded-md hover:bg-yellow-500 hover:text-white"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
