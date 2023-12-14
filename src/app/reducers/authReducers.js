import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseInit";

const initialState = {
  userList: [],
  isLoggedIn: false,
  userLoggedIn: null,
};

export const getInitialUserList  = createAsyncThunk(
  "auth/userList",
  (arg, thunkApi) => {
    const snap = onSnapshot(collection(db, "Users"), (snapShot) => {
      const users = snapShot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      thunkApi.dispatch(setUserList(users));
    });
  }
);

export const createUserThunk = createAsyncThunk(
  "auth/createUser",

  async (data, thunkApi) => {
    const { authReducer } = thunkApi.getState();
    const { userList } = authReducer;

    const index = userList.findIndex((user) => user.email === data.email);
    console.log(userList);

    if (index !== -1) {
      toast.error("Email already exist, Try again or SignIn Instead!!!");
      return false;
    }

    const docRef = await addDoc(collection(db, "Users"), {
      name: data.name,
      email: data.email,
      password: data.password,
      cart: [],
      orders: [],
    });
    toast.success("User created successfully");
  }
);

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (data, thunkAPI) => {
    // getting userList from initialState
    const { authReducer } = thunkAPI.getState();
    console.log(thunkAPI.getState());
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
      thunkAPI.dispatch(setLoggedIn(true));
      thunkAPI.dispatch(setUserLoggedIn(userList[index]));

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

export const removeSessionThunk = createAsyncThunk("auth/removeSession", () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("index");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserLoggedIn: (state, action) => {
      state.userLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeSessionThunk.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.userLoggedIn = null;
      toast.success("Logout Successfully!!!");
    });
  },
});

// exporting the reducer
export const authReducer = authSlice.reducer;
// exporting the reducer actions
export const { setUserList, setLoggedIn, setUserLoggedIn } = authSlice.actions;
// exporting the reducer selectors to get the state
export const authSelector = (state) => state.authReducer;
