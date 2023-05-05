import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorPage from './components/ErrorPage/ErrorPage';
import AuthorizationPage from './components/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './components/RegistrationPage/RegistrationPage';
import MainPage from './components/MainPage/MainPage';
import DatingPage from './components/DatingPage/DatingPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SympathiesPage from './components/SympathiesPage/SympathiesPage';
import MessagesPage from './components/MessagesPage/MessagesPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './fonts/Inter/Inter-Regular.otf'
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/authorization",
    element: <AuthorizationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration",
    element: <RegistrationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dating",
    element: <DatingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sympathies",
    element: <SympathiesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/messages",
    element: <MessagesPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

