import { all } from 'redux-saga/effects';
import { watchFetchClubList } from './clubListSaga';

export default function* rootSaga() {
  yield all([watchFetchClubList()]);
}