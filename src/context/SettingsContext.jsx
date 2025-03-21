import { createContext, useState, useEffect } from "react";

const SettingsContext = createContext(null);

// This is the context provider for anything that's wrapped around it.
const SettingsProvider = ({ children }) => {
    const [colorTheme, setColorTheme] = useState(() => localStorage.getItem("colorTheme") || "light"); // Light or dark mode
    const [volume, setVolume] = useState(() => Number(localStorage.getItem("volume")) || 100); // Default volume is 100%
    const [timer, setTimer] = useState(() => Number(localStorage.getItem("timer")) || 1500); // Default timer is set to 25 mins
    const [resetTimer, setResetTimer] = useState(() => Number(localStorage.getItem("resetTimer")) || 1500); // Default reset timer that changes for dynamic reset timer
    const [enableSounds, setEnableSounds] = useState(() => localStorage.getItem("enableSounds") === "true"); // Default is true/enabled
    const [visibility, setVisibility] = useState("") // Visibility state for some usecases if i need to hide something
    const [progressBarState, setProgressBarState] = useState(false);
    const [isOnBreak, setIsOnBreak] = useState(() => { // Prevents the timer from going back to false when the state is true if the user refreshess the page
        const storedState = localStorage.getItem("isOnBreak");
        return storedState ? JSON.parse(storedState) : false;
    });

    // Save changes to localStorage
    // Might need to rework everything here, make arrays instead of single key and values, but that's if i have time
    useEffect(() => {
        localStorage.setItem("colorTheme", colorTheme);
    }, [colorTheme]); 

    useEffect(() => {
        localStorage.setItem("volume", volume);
    }, [volume]);

    useEffect(() => {
        localStorage.setItem("timer", timer);
    }, [timer]);

    useEffect(() => {
        localStorage.setItem("enableSounds", enableSounds);
    }, [enableSounds]);

    useEffect(() => {
        localStorage.setItem("resetTimer", resetTimer);
    }, [resetTimer]);

    useEffect(() => {
        localStorage.setItem("progressBarState", progressBarState);
    }, [progressBarState]);

    useEffect(() => {
        localStorage.setItem("isOnBreak", isOnBreak);
    }, [isOnBreak]);

    const toggleTheme = () => {
        setColorTheme((prev) => prev === "light" ? "dark" : "light");
    };

    const toggleVisibility = () => {
        setVisibility((prev) => prev === "" ? "hidden" : "");
    };

    const toggleSounds = () => {
        setEnableSounds((prev) => !prev);
    }

    const toggleBreak = () => {
        setIsOnBreak((prev) => !prev);
    }

    return ( // gives context to the child components
        <SettingsContext.Provider value={{ colorTheme, setColorTheme, toggleTheme, volume, setVolume, timer, setTimer, resetTimer, isOnBreak, toggleBreak, progressBarState, setProgressBarState, setResetTimer, enableSounds, setEnableSounds, toggleSounds, visibility, toggleVisibility }}>
            {children}
        </SettingsContext.Provider>
    );
};

export { SettingsContext, SettingsProvider };

