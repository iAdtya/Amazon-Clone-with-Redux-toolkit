import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";

const initialState = { userList: [], isLoggedIn: false, userLoggedIn: null };

export const getInitialData = createAsyncThunk(
  "auth/userList",
  (arg, thunkApi) => {
    const snap = onSnapshot(collection(db, "Items"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      // thunkApi.dispatch(setUserList(users));
    });
  }
);

export const createUserThunk = createAsyncThunk(
  "auth/createUser",
  async (arg, thunkApi) => {
    const docRef = await addDoc(collection(db, "Items"), {
      name: arg.name,
      email: arg.email,
      password: arg.password,
    });
    toast.success("User created successfully");
  }
);

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (data, thunkAPI) => {
    // getting userList from initialState
    const { authReducer } = thunkAPI.getState();
    const { userList } = authReducer;

    // finding user inside the userList
    const index = userList.findIndex((user) => user.email === data.email);

    // if user not found show notification
    if (index === -1) {
      toast.error("Email does not exist, Try again or SignUp Instead!!!");
      return false;
    }

    // if email found in database then match password
    if (userList[index].password === data.password) {
      toast.success("Sign In Successfully!!!");

      // logging in user and storing its data in local variable
      // thunkAPI.dispatch(setLoggedIn(true));
      // thunkAPI.dispatch(setUserLoggedIn(userList[index]));

      // generating user's login token and store user's data
      window.localStorage.setItem("token", true);
      window.localStorage.setItem("index", JSON.stringify(userList[index]));
      return true;
    } else {
      // if password doesn't match in database
      toast.error("Wrong UserName/Password, Try Again");
      return false;
    }
  }
);
