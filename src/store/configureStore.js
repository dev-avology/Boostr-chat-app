import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import loginReducer from "../reducers/loginReducer";
import resetReducer from "../reducers/resetSlice";
import clubListReducer from '../reducers/clubListSlice'; // Import your reducers

const rootReducer = combineReducers({
  auth: loginReducer,
  clubList: clubListReducer
});

const store = configureStore({
  reducer: rootReducer,
  // Other store configurations...
  reset: resetReducer,
  middleware: [thunk],
});

export default store;
