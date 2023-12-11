import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignUp } from "./Pages/signUp";
import { Navbar } from "./Component/Navbar";
import { SignIn } from "./Pages/SignIn";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          path: "/singUp",
          element: <SignUp />,
        },
        {
          path: "./signIn",
          element: <SignIn />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
