import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const logIn = async (user) => {
  try {
    // Dispatch the login action to indicate the login process has started

    const response = await axios.post(
      "https://staging3.booostr.co/wp-json/chat-api/v1/login",
      {
        username: user.username, // Replace with the actual email value
        password: user.password, // Replace with the actual password value
      }
    );
    if (response && response.data) {
      const user_id = response.data.user_id;
      if (user_id && user_id !== null) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("user_id", JSON.stringify(user_id));
        return {
          status: "success",
          message: "You are redirecting to the home page",
          user_id: JSON.stringify(user_id),
        };
      } else {
        console.error("API Error:" + response.data);
        alert(response.data.error);
      }
    } else {
      console.error("API Error: Response or response.data is undefined");
      alert("Login failed. Please try again later.");
    }
  } catch (error) {
    console.error(
      "API Error:",
      error.response ? error.response.data.message : error.message
    );
    alert("Login failed. Please try again later.");
  } finally {
  }
};

const logOut = async () => {
  AsyncStorage.clear();
  return {
    status: "success",
    message: "You are logged out",
  };
};

const getUserDataById = async (userId) => {
  try {
    const response = await axios.get(
      `https://staging3.booostr.co/wp-json/chat-api/v1/chat_get_user_info?user_id=${userId}`
    );
    return {
      status: "success",
      message: "You are redirecting to the home page",
      data: JSON.stringify(response.data),
    };
  } catch (error) {
    throw error;
  }
};

export default {
  logIn,
  logOut,
  getUserDataById,
};
