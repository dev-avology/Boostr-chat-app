import { loginSuccess, loginError } from "../reducers/loginReducer";
import AuthService from "../api";

export const login = (user) => (dispatch) => {
  return AuthService.logIn(user)
    .then(
      (response) => {
        if (response.status === "success") {
          let user_id = response.user_id;
          dispatch(loginSuccess(user_id));
          Promise.resolve();
          return response;
        }
      },
      (error) => {
        const message = error.toString();
        Promise.reject();
        return message;
      }
    )
    .catch((err) => {
      dispatch(loginError());
      reject(err);
    });
};
export const logout = () => (dispatch) => {
  return AuthService.logOut().then((response) => {
    if (response.status === "success") {
      Promise.resolve();
      return response;
    }
  });
};

export const getUserData = (user_id) => (dispatch) => {
  console.log(user_id);
  return AuthService.getUserDataById(user_id).then((response) => {
    if (response.status === "success") {
      Promise.resolve();
      return response;
    }
  });
};