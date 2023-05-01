import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AuthorizationPage from './AuthorizationPage/AuthorizationPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import MainPage from './MainPage/MainPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

