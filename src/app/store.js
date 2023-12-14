import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import { productReducer } from "./reducers/productReducers";

export const store = configureStore({
  reducer: { authReducer, productReducer },
});
