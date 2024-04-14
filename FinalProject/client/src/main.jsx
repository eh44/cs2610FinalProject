import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Home } from './pages/Home.jsx';
import { Game1 } from './pages/Game1.jsx';
import {Profile} from './pages/Profile.jsx';
const router = createHashRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: '/Game1',
        element: <Game1 />,
      },
      {
        path: '/Profile',
        element: <Profile />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
