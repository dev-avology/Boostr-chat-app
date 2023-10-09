import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CHAT_API_URL } from "../config";
const chatMessagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUserMessagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserMessagesSuccess: (state, action) => {
      state.loading = false;
      state.messages = action.payload;
    },
    fetchUserMessagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUserMessagesStart,
  fetchUserMessagesSuccess,
  fetchUserMessagesFailure,
} = chatMessagesSlice.actions;

export const fetchUserMessages =
  (conversationId, userId) => async (dispatch) => {
    try {
      dispatch(fetchUserMessagesStart());

      const requestData = {
        id: conversationId,
        user_id: userId,
      };

      const response = await axios.post(
        `${CHAT_API_URL}/chat_get_conversation_messages`,
        requestData
      );
      dispatch(fetchUserMessagesSuccess(JSON.stringify(response.data)));
    } catch (error) {
      dispatch(fetchUserMessagesFailure(error));
    }
  };

export const autofetchUserMessages =
  (conversationId, userId) => async (dispatch) => {
    try {
      const requestData = {
        id: conversationId,
        user_id: userId,
      };

      const response = await axios.post(
        `${CHAT_API_URL}/chat_get_conversation_messages`,
        requestData
      );
      dispatch(fetchUserMessagesSuccess(JSON.stringify(response.data)));
    } catch (error) {
      dispatch(fetchUserMessagesFailure(error));
    }
  };

export default chatMessagesSlice.reducer;
