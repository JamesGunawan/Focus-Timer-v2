import React, { useEffect } from "react";
import "../settings/Settings.css";
import VolumeSlider from "../settings/Volume";
import ThemeToggler from "../settings/ThemeToggler";
import CustomTime from "../settings/CustomTime";
import { X } from "lucide-react";
import ResetSettings from "../settings/ResetSettings";
import ToggleSound from "../settings/ToggleSound";
import TimerMode from "../settings/TimerMode";

function SettingsOverlay({ closeSettings }) {
    // Add overlay-active class to body when component mounts
    useEffect(() => {
        document.body.classList.add("overlay-active");

        return () => {
            document.body.classList.remove("overlay-active");
        };
    }, []);

    return (
        <div className="background-wrapper">
            <div className="settings-container">
                <X onClick={closeSettings} className="close-icon" />
                <h1>Settings</h1>
                <TimerMode/>
                <CustomTime/>
                <ThemeToggler/> {/* If you're reading this i just want to let you know the button works but it does nothing because i haven't implemented the functions yet*/}
                <ToggleSound/>
                <VolumeSlider/>
                <button onClick={closeSettings}>Save</button> {/* This button actually does nothing LOL (cuz the settings updates as the user interacts with it which is caused by useEffect), 
                it just gives the user the illusion of saving their settings and an alternative way to close the settings menu */}
                <ResetSettings/>
            </div>
        </div>
    );
}

export default SettingsOverlay;
