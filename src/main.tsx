import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SettingsProvider } from "./context/SettingsContext";
import { AchievementProvider } from "./context/AchievementContext";
import { NotificationProvider } from "./context/NotificationContext";
import { StatisticsProvider } from "./context/StatisticsContext.jsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <StatisticsProvider>
        <AchievementProvider>
          <NotificationProvider>
          <App/>
          </NotificationProvider>
        </AchievementProvider>
      </StatisticsProvider>
    </SettingsProvider>
  </StrictMode>,
)
