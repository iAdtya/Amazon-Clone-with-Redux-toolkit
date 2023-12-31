import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SignUp } from "./Pages/signUp";
import { Navbar } from "./Component/Navbar";
import { SignIn } from "./Pages/SignIn";
import { Home } from "./Component/Home";
import { Error } from "./Pages/Error";
import { Cart } from "./Pages/Cart";
import { MyOrder } from "./Pages/MyOrder";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/signIn",
          element: <SignIn />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/myOrder",
          element: <MyOrder />,
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
