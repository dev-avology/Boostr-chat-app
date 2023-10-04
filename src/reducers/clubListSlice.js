import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const clubSlice = createSlice({
  name: 'clubs',
  initialState: {
    clubs: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchClubListStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchClubListSuccess: (state, action) => {
      state.loading = false;
      state.clubs = action.payload;
    },
    fetchClubListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchClubListStart,
  fetchClubListSuccess,
  fetchClubListFailure,
} = clubSlice.actions;

export const fetchClubList = (userId) => async (dispatch) => {
  try {
    
    dispatch(fetchClubListStart());
    const response = await axios.get(`https://staging3.booostr.co/wp-json/chat-api/v1/get_club_list?user_id=${userId}`);
    dispatch(fetchClubListSuccess(JSON.stringify(response.data)));
  } catch (error) {
    console.log(userId);
    dispatch(fetchClubListFailure(error));
  }
};

export default clubSlice.reducer;