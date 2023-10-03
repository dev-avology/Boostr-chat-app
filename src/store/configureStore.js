import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import loginReducer from "../reducers/loginReducer";

const rootReducer = combineReducers({
    auth: loginReducer,
});

const store = configureStore({
    reducer: rootReducer,
    // Other store configurations...
  });

export default store;
