import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../app/reducers/authReducers";
import { NavLink } from "react-router-dom";

export function SignUp() {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(createUserThunk(data));
    // console.log(data);
    navigate("/signin");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-xl font-bold">SignUp</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full p-2 border rounded"
            required
            autoComplete="Name"
            ref={nameRef}
          />
          <input
            ref={emailRef}
            type="email"
            placeholder="Enter Email"
            required
            className="w-full p-2 border rounded"
            autoComplete="username"
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Enter Password"
            required
            className="w-full p-2 border rounded"
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full p-2 text-white rounded bg-red-400"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <span className="mr-2">or</span>
          <NavLink to="/signin" className="text-blue-500 hover:underline">
            Already have an account? Sign In
          </NavLink>
        </div>
      </div>
    </div>
  );
}
