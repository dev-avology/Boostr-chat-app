import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { resetAllStates } from "./resetSlice";
const initialState = {
  isLoggedIn: false,
  CurrentUserID: null,
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.isLoggedIn = false;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.CurrentUserID = action.payload;
      state.error = false;
    },
    loginError: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = true;
    },
    setCurrentUserID: (state, action) => {
      state.CurrentUserID = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAllStates, (state) => {
      return { ...initialState };
    });
  },
});

export const { loginRequest, loginSuccess, loginError, setCurrentUserID } =
  authSlice.actions;

export default authSlice.reducer;
