import { useRef } from "react";

// redux tool for calling acitons
import { useDispatch } from "react-redux";

// reducer actions Auth Reducer
import { createSessionThunk } from "../app/reducers/authReducers";

// react router
import { NavLink, useNavigate } from "react-router-dom";

export function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(data);
    const status = dispatch(createSessionThunk(data));
    // if user signed in redirect to corresponding page

    status ? navigate("/") : navigate("/signIn");
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-xl font-bold text-brown-500">SignIn</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            className="w-full p-2 border border-brown-500 rounded"
            autoComplete="username"
            ref={emailRef}
          />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            required
            className="w-full p-2 border border-brown-500 rounded"
            autoComplete="new-password"
            ref={passwordRef}
          />
          <button
            type="submit"
            className="w-full p-2 bg-brown-500 text-white rounded bg-red-400"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <span className="mr-2 text-brown-500">or</span>
          <NavLink to="/signup" className="text-brown-500 hover:underline">
            Create New Account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
