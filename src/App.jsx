import { Routes, Route } from "react-router-dom";

import Index from './routes/index';
import Channel from './routes/channel';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/:channelID" element={<Channel />} />
    </Routes>
  )
}

export default App;
