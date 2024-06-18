'use client';
import { useState } from 'react';

const AlarmClock = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [alarms, setAlarms] = useState<string[]>([]);
    const [alarmSound, setAlarmSound] = useState<HTMLAudioElement>();

    const getCurrentTime = () => {
        const date = new Date();
        const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = date.getHours() >= 12 ? 'PM' : 'AM';
        const now = `${hours}:${minutes} ${period}`;
        setCurrentTime(now);
    };

    const setAlarm = () => {
        const alarmHourInput = document.getElementById('alarmHour') as HTMLSelectElement;
        const alarmMinuteInput = document.getElementById('alarmMinute') as HTMLSelectElement;
        const alarmPeriodInput = document.getElementById('alarmPeriod') as HTMLSelectElement;
        const alarmTime = `${alarmHourInput.value}:${alarmMinuteInput.value} ${alarmPeriodInput.value}`;
        if (!alarmTime) {
            alert('Please set a valid alarm time.');
            return;
        }

        const now = new Date();
        const alarm = new Date(now.toDateString() + ' ' + alarmTime);

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
        (document.getElementById('alarmHour') as HTMLSelectElement).disabled = false;
        (document.getElementById('alarmMinute') as HTMLSelectElement).disabled = false;
        (document.getElementById('alarmPeriod') as HTMLSelectElement).disabled = false;
    };

    const stopAlarm = () => {
        setAlarms([]);
        if (alarmSound) {
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }
        (document.getElementById('alarmHour') as HTMLSelectElement).disabled = false;
        (document.getElementById('alarmMinute') as HTMLSelectElement).disabled = false;
        (document.getElementById('alarmPeriod') as HTMLSelectElement).disabled = false;
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
            <div className="mb-4">
                <button onClick={setAlarm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Set Alarm</button>
                <button onClick={stopAlarm} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Stop Alarm</button>
            </div>
            <div>
                <h2 className="text-lg font-bold mb-2">Alarms:</h2>
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
