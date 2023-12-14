import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authSelector,
  getInitialUserList,
  setLoggedIn,
  setUserLoggedIn,
} from "../app/reducers/authReducers";

export function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn, userLoggedIn } = useSelector(authSelector);
  const [isLoading, setLoading] = useState(true);

  // to whether show/hide the filter bar on homepage
  // const [applyFilter, setApplyFilter] = useState(false);

  // to filter item on the basis of price and item category
  // const [price, setPrice] = useState(5000);
  // const [category, setCategory] = useState("none");

  useEffect(() => {
    // show/hide the load spinner
    setTimeout(() => {
      setLoading(false);
    }, 400);

    // getting user's token from local Storage on first render
    const token = window.localStorage.getItem("token");
    if (token) {
      // if user is logged in
      // getting loggedIn user's data
      const index = window.localStorage.getItem("index");
      const user = JSON.parse(index);
      // set token and loggedIn user
      dispatch(setLoggedIn(token));
      dispatch(setUserLoggedIn(user));
    }
  }, []);

  useEffect(() => {
    dispatch(getInitialUserList());
  }, [isLoggedIn]);

  return (
    <>
      <h1>hello!!!!</h1>
    </>
  );
}
