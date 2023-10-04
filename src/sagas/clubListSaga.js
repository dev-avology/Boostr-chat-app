import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { fetchClubListSuccess, fetchClubListFailure } from '../reducers/clubListSlice';

function* fetchClubListSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(() =>
      axios.get(`https://staging3.booostr.co/wp-json/chat-api/v1/get_club_list?user_id=${userId}`)
    );
    yield put(fetchClubListSuccess(response.data));
  } catch (error) {
    yield put(fetchClubListFailure(error));
  }
}

export function* rootSaga() {
  yield takeLatest(fetchClubList.type, fetchClubListSaga);
}