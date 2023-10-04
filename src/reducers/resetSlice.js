// resetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const resetSlice = createSlice({
  name: "reset",
  initialState: false,
  reducers: {
    resetAllStates: (state) => {
      return true;
    },
  },
});

export const { resetAllStates } = resetSlice.actions;
export default resetSlice.reducer;
