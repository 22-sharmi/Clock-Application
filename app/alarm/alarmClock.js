import { useState } from 'react';

const AlarmClock = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [alarms, setAlarms] = useState([]);
    const [alarmSound, setAlarmSound] = useState(null);

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';
        const now = `${hours}:${minutes} ${period}`;
        setCurrentTime(now);
    };

    const setAlarm = () => {
        const alarmHourInput = document.getElementById('alarmHour');
        const alarmMinuteInput = document.getElementById('alarmMinute');
        const alarmPeriodInput = document.getElementById('alarmPeriod');
        const alarmTime = `${alarmHourInput.value}:${alarmMinuteInput.value} ${alarmPeriodInput.value}`;
        
        if (!alarmTime) {
            alert('Please set a valid alarm time.');
            return;
        }
    
        const now = new Date();
        const alarm = new Date(now.toDateString() + ' ' + alarmTime);
    
        // Check if the alarm time is in the future
        if (alarm.getTime() <= now.getTime()) {
            alert('Alarm time should be in the future.');
            return;
        }
    
        const timeRemaining = alarm.getTime() - now.getTime();
    
        setTimeout(() => {
            playAlarm();
            setAlarms(prevAlarms => [...prevAlarms, alarmTime]);
        }, timeRemaining);
    
        alarmHourInput.disabled = true;
        alarmMinuteInput.disabled = true;
        alarmPeriodInput.disabled = true;
    };    

    const playAlarm = () => {
        const alarmAudio = new Audio('/best_alarm.mp3');
        alarmAudio.play();
        setAlarmSound(alarmAudio);
        document.getElementById('alarmHour').disabled = false;
        document.getElementById('alarmMinute').disabled = false;
        document.getElementById('alarmPeriod').disabled = false;
    };

    const stopAlarm = () => {
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        document.getElementById('alarmHour').disabled = false;
        document.getElementById('alarmMinute').disabled = false;
        document.getElementById('alarmPeriod').disabled = false;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
                <select id="alarmHour" className="border bg-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
                    {[...Array(12).keys()].map(hour => (
                        <option key={hour + 1}>{hour + 1}</option>
                    ))}
                </select>
                <span className="mr-2">:</span>
                <select id="alarmMinute" className="border bg-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
                    {[...Array(60).keys()].map(minute => (
                        <option key={minute}>{minute < 10 ? `0${minute}` : minute}</option>
                    ))}
                </select>
                <select id="alarmPeriod" className="border bg-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500">
                    <option>AM</option>
                    <option>PM</option>
                </select>
            </div>
            {/* <div className="mb-4">
                <button onClick={setAlarm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Set Alarm</button>
                <button onClick={stopAlarm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop Alarm</button>
            </div> */}
             <div className="mb-4 flex gap-2">
        <button
         onClick={setAlarm}
          className="relative px-8 py-2 rounded-md bg-black isolation-auto z-10 border-2 border-blue-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-left-full before:hover:left-0 before:rounded-full before:bg-blue-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-blue-700 bg-black border border-gray-200 rounded-lg shadow-sm gap-x-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          Set Alarm
        </button>
        <button
          onClick={stopAlarm}
          className="relative px-8 py-2 rounded-md bg-black isolation-auto z-10 border-2 border-red-700 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-red-700 before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-red-700 bg-black border border-gray-200 rounded-lg shadow-sm gap-x-2 disabled:opacity-50 disabled:pointer-events-none"
        >
          Stop Alarm
        </button>
      </div>
            <div>   
                <ul>
                    {alarms.map((alarm, index) => (
                        <li key={index}>{alarm}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AlarmClock;
