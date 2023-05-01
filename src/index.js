import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AuthorizationPage from './components/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import MainPage from './components/MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './fonts/Inter/Inter-Regular.otf'
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/authorization",
    element: <AuthorizationPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    errorElement: <ErrorPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

