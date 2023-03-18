import HomeLayout from "./components/Home/HomeLayout";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <HomeLayout />,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
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
