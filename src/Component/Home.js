import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authSelector,
  getInitialUserList,
  setLoggedIn,
  setUserLoggedIn,
} from "../app/reducers/authReducers";
import Loader from "./Loader";

import { getInitialCartOrdersThunk } from "../app/reducers/productReducers";

import FilterBar from "./FilterBar";

import MainContent from "./MainContent";

export function Home() {
  const dispatch = useDispatch();
  const { isLoggedIn, userLoggedIn } = useSelector(authSelector);
  const [isLoading, setLoading] = useState(true);

  const [applyFilter, setApplyFilter] = useState(false);

  const [price, setPrice] = useState(5000);
  const [category, setCategory] = useState("none");

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getInitialCartOrdersThunk());
  }, [userLoggedIn]);

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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="text-center mt-5">
            <input
              type="text"
              placeholder="Search Item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 h-8 rounded border border-yellow-400 px-2 text-red-500"
            />

            <button
              onClick={() => setApplyFilter(!applyFilter)}
              className="float-right mr-10 h-8 w-24 text-sm rounded-none bg-red-500 text-white"
            >
              {applyFilter ? "Cancel" : "Apply Filter"}
            </button>
          </div>

          <div className="flex flex-wrap">
            {applyFilter && (
              <FilterBar
                price={price}
                setPrice={setPrice}
                setCategory={setCategory}
              />
            )}

            <MainContent
              search={search}
              price={price}
              category={category}
              applyFilter={applyFilter}
            />
          </div>
        </>
      )}
    </>
  );
}
