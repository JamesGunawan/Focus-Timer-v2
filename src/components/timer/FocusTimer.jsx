import React, { useContext } from "react";
import useFocusTimer from "../hooks/UseFocusTimer";
import ProgressBar from "./Progressbar";
import { SettingsContext } from "../context/SettingsContext";

const FocusTimer = () => {
    const { resetTimer } = useContext(SettingsContext);
    const { 
        timer, 
        timerStateDisplay, 
        alertTimer, 
        trackButton, 
        start, 
        reset,
        formatTime
    } = useFocusTimer();

    return (
        <> 
        <h1 className="alarm-alert">{alertTimer}</h1>
        <div className="timer-container"> 
            <h1 className="timer">Timer : {formatTime(timer)} </h1>
            <ProgressBar currentTime={timer} totalTime={resetTimer} />
            <div className="buttons">
                <button className={trackButton} onClick={start}>{timerStateDisplay}</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
        </>
    );
};

export default FocusTimer;
