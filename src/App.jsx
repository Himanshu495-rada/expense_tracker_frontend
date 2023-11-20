import React from 'react';
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";

import Dashboard from './pages/dashboard/Dashboard';
import Budgeting from './pages/budgeting/Budgeting';
import Entry from './pages/entry/Entry';
import Home from './pages/home/Home';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import Error from './pages/error/Error';

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/budgeting",
    element: <Budgeting />,
  },
  {
    path: "/entry",
    element: <Entry />,
  },
  {
    path: "/reports",
    element: <Reports />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "*",
    element: <Home />,
  },
  {
    path: "/error",
    element: <Error />,
  }
]);

function App() {

  return (

    <RouterProvider router={router} />

  )
}

export default App
