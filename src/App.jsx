import { useState, useEffect } from 'react'
import { useLocation, Routes, Route } from "react-router-dom";

import ReactGA from "react-ga4";
import Index from './routes/index';
import Channel from './routes/channel';
import './App.css';

function App() {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_GA4_ID) {
      console.log('GA initialized!')
      ReactGA.initialize(import.meta.env.VITE_GA4_ID);
      setInitialized(true);
    }
  }, []);
  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send("pageview");
    }
  }, [initialized, location]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:channelID" element={<Channel />} />
    </Routes>
  )
}

export default App;
