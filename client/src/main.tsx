import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ErrorPage from './pages/Error';
import GuessWhoGame from './pages/Guesswho.js';
import GameStartLanding from './pages/GameStartLanding.js';
import GameLogs from './pages/GameLogs';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/guesswho',
        element: <GameStartLanding />
      },
      {
        path: '/guesswho/play',
        element: <GuessWhoGame />
      },
      {
        path: '/logs',
        element: <GameLogs />
      }
    ]
  }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
