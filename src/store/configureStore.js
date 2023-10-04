import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginReducer";
import resetReducer from "../reducers/resetSlice";

const rootReducer = combineReducers({
  auth: loginReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // Other store configurations...
  reset: resetReducer,
});

export default store;
