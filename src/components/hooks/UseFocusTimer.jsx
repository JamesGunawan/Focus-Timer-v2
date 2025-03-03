import { useState, useEffect, useRef, useContext } from "react";
import { checkStopAvailabilty, checkTimesAvailability } from "../statistics/SessionStats";
import { SettingsContext } from "../context/SettingsContext";
import { AchievementContext } from "../context/AchievementContext";

const useFocusTimer = () => {
    const {timer, setTimer, volume, enableSounds } = useContext(SettingsContext);
    const { unlockAchievement } = useContext(AchievementContext);
    const [inputValue, setInputValue] = useState(""); // User input time
    const [timerState, setTimerState] = useState(false); // Timer running state
    const [timerStateDisplay, setTimerStateDisplay] = useState("Start"); // Display text for start/stop button
    const [alertTimer, setAlertTimer] = useState(""); // Alert timer state
    
    const trackButton = timerState ? "stop-button" : "start-button"; // Class for start/stop button

    const handleInputChange = (e) => {
        const inputValue = e.target.value; // Get input value

        // Check if the value is a valid number and not negative
        if (inputValue < 0) {
            alert("Please enter a positive number");
        } else {
            setTimer(inputValue); // Update input value as user types
        }
    };

    const achievementHandler = () => {
        const totalFinish = localStorage.getItem("times-finished")
        if(totalFinish >= 1) {
            unlockAchievement(1); // First achievement (if user has finished at least one session)
        } else if(totalFocus >= 5) {
            unlockAchievement(2); // Second achievement (if user has finished at least 5 sessions)
        } else if( totalFocus >= 25) {
            unlockAchievement(3); // Third achievement (if user has finished at least 25 sessions)
        }
    }

    const alarmAudio = useRef(new Audio('/alarm.mp3'));

    useEffect(() => {
        checkTimesAvailability(); // Checks if tracker exists in local storage
        checkStopAvailabilty();
        // If timerState is true, decrement timer every second
        if (!timerState || timer < 0) return;
        const interval = setInterval(() => {
            setTimer(prevTime => {
                // When timer hits 0, reset it to the original value and change the display text back to the default state
                if (prevTime <= 0) {
                    clearInterval(interval);
                    setTimerState(false);
                    alarmAudio.current.muted = !enableSounds;  
                    alarmAudio.current.volume = volume / 100; // Gets volume from settings context and controls the volume level from (0 - 1)
                    alarmAudio.current.play();
                    setAlertTimer("Timer Finished!");
                    setTimerStateDisplay("Start");
                    const updateRecord = parseInt(localStorage.getItem("times-finished"));
                    localStorage.setItem("times-finished", updateRecord + 1);
                    achievementHandler(); // Chekcs Achivement
                    return 1500; // Returns to 25 mins
                }
                return prevTime - 1;    
            });
        }, 1000); // 1 second

        // Clear interval when it finishes
        return () => clearInterval(interval);
    }, [timerState, volume, enableSounds]);

    // Start/Stop timer
    const start = () => {
        setTimerStateDisplay("Stop");
        if (timerState) { //if true (on) change to false (off)
            setTimerStateDisplay("Start");
            setTimerState(false);
            const updateRecord = parseInt(localStorage.getItem("times-stopped"));
            localStorage.setItem("times-stopped", updateRecord + 1);
            return;
        }
        
        // Check if the input value is a valid number and not negative 
        const countdown = inputValue && inputValue > 0 ? Number(inputValue) : timer;
        setAlertTimer("");
        setTimer(countdown);
        setTimerState(true);
        
        // Clear the input field when start is clicked
        setInputValue("");
    };

    // Reset timer
    const reset = () => {
        setTimerState(false);
        setTimerStateDisplay("Start");
        setTimer(1500);
        setAlertTimer("");
        
    };

    // Time Formatter
    // Converts countdown to hours, minutes, and seconds
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600); // Get the hours part
        const minutes = Math.floor((seconds % 3600) / 60); // Get the minutes part
        const remainingSeconds = seconds % 60; // Get the seconds part

        // Ensure two digits for minutes and seconds (e.g., 1:01 instead of 1:1)
        return `${hours > 0 ? hours + ':' : ''}${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return {
        timer,
        inputValue,
        timerStateDisplay,
        alertTimer,
        trackButton,
        handleInputChange,
        start,
        reset,
        formatTime
    };
};

export default useFocusTimer;
