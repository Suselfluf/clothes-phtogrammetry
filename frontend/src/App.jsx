import HomeLayout from "./components/Home/HomeLayout";
import React from "react";
import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
  BrowserRouter,
} from "react-router-dom";

import RouteSystem from "./Router/RouteSystem.jsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <HomeLayout />,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  return (
    <>
      <React.StrictMode>
        {/* <RouterProvider router={router} /> */}
        <BrowserRouter>
          <RouteSystem />
        </BrowserRouter>
      </React.StrictMode>
    </>
  );
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}

export default App;
