'use client';
import React, { useState, useEffect } from 'react';
import { MdOutlineAlarm } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { IoMdStopwatch } from "react-icons/io";
import { GoHourglass } from "react-icons/go";

// import Clock from './clock/page';
// import Alarm from './alarm/page';
// import Stopwatch from './stopwatch/page';
// import Timer from './timer/page';
import Alarm from './alarm/alarmClock';
import Clock from './clock/digitalClock';
import Stopwatch from './stopwatch/stopWatch';
import Timer from './timer/countTimer';

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('Alarm');

  const handleComponentChange = (component: React.SetStateAction<string>) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    // This effect will run only on the first render
    // to set the initial active component
  }, []);

  return (
    <main>
      <div className="bg-black h-screen flex flex-col justify-center items-center text-white">
        <div className="flex gap-12 mb-8">
          <MdOutlineAlarm
            className={`text-white cursor-pointer ${activeComponent === 'Alarm' ? 'text-blue-500' : ''}`}
            onClick={() => handleComponentChange('Alarm')}
          />
          <FiClock
            className={`text-white cursor-pointer ${activeComponent === 'Clock' ? 'text-blue-500' : ''}`}
            onClick={() => handleComponentChange('Clock')}
          />
          <IoMdStopwatch
            className={`text-white cursor-pointer ${activeComponent === 'Stopwatch' ? 'text-blue-500' : ''}`}
            onClick={() => handleComponentChange('Stopwatch')}
          />
          <GoHourglass
            className={`text-white cursor-pointer ${activeComponent === 'Timer' ? 'text-blue-500' : ''}`}
            onClick={() => handleComponentChange('Timer')}
          />
        </div>
        <div>
        {activeComponent === 'Alarm' && <Alarm />}
        {activeComponent === 'Clock' && <Clock />}
        {activeComponent === 'Stopwatch' && <Stopwatch />}
        {activeComponent === 'Timer' && <Timer />}
      </div>
      </div>
    </main>
  );
}