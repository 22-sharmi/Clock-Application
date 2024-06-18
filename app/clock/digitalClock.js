import React, { useState, useEffect } from 'react';

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';
    const now = `${hours}:${minutes}:${seconds} ${period}`;
    setCurrentTime(now);

    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    setCurrentDate(formattedDate);
  };

  useEffect(() => {
    const intervalId = setInterval(getCurrentTime, 1000);
    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="text-center p-4">
      <h2 className="text-lg font-bold mb-2">Local Time</h2>
      <p className="text-2xl font-medium mb-1">{currentTime}</p>
      <p className="text-lg">{currentDate}</p>
    </section>
  );
}

export default DigitalClock;