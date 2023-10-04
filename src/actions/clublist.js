import {} from "../reducers/clubListSlice";
import { resetAllStates } from "../reducers/resetSlice";
import AuthService from "../api";

export const getClubListData = (user_id) => (dispatch) => {
  return AuthService.getClubListById(user_id).then((response) => {
    if (response.status === "success") {
      Promise.resolve();
      return response;
    }
  });
};