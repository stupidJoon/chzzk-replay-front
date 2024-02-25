import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Index from './routes/index';
import Channel from './routes/channel';


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
    console.log(initialized, location);
    if (initialized) {
      console.log('Page Changed!', location.pathname);
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


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
