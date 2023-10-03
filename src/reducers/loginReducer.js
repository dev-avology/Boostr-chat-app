import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  isLoggedIn: false,
  CurrentUserID: null,
  loading: false,
  error: false,
};

// Create the authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    logout: (state) => {
      state.isLoggedIn = false;
      // Reset other state properties when the user logs out
    },
    setCurrentUserID: (state, action) => {
      state.CurrentUserID = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { login, loginSuccess, loginError, logout, setCurrentUserID } = authSlice.actions;

export default authSlice.reducer;
