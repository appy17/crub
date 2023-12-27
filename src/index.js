import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProvider } from './components/context/AppContext';
import { RouterProvider } from "react-router-dom";
import { router } from "./lib/route";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
     {/* <RouterProvider router={router}> */}

      <App/>
    {/* </RouterProvider> */}

    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

