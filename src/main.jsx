import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from './routes/index';
import Channel from './routes/channel';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/:channelID",
    element: <Channel />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
