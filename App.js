// App.js

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ChatUserLists from "./src/screens/chats";
import ChatDashboard from "./src/screens/ChatDashboard";
import UserProfile from "./src/screens/UserProfile";
import SelectProfileScreen from "./src/screens/SelectProfile";
import ClubList from "./src/screens/ClubList";
import SettingsPage from "./src/screens/Settings";
import AllUserList from "./src/screens/AllUsers";
import AllGroupsscreen from "./src/screens/AllGroups";
import GroupProfile from "./src/screens/GroupProfile";
import GroupChatDashboard from "./src/screens/GroupChatDashboard";
import { setCurrentUserID } from "./src/reducers/loginReducer";

const Stack = createNativeStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        let user_id;

        try {
          user_id = JSON.parse(storedUserId);
        } catch (parseError) {
          console.error("Error parsing user_id:", parseError);
          user_id = null; // Set user_id to null if parsing fails
        }

        if (user_id !== null) {
          // Dispatch an action to set the current user ID
          dispatch(setCurrentUserID(user_id));
        }
      } catch (error) {
        console.error("Error fetching user_id:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "ClubList" : "Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ClubList" component={ClubList} />
          <Stack.Screen name="ChatUserLists" component={ChatUserLists} />
          <Stack.Screen name="ChatDashboard" component={ChatDashboard} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="SelectProfile" component={SelectProfileScreen} />
          <Stack.Screen name="SettingsPage" component={SettingsPage} />
          <Stack.Screen name="AllUserList" component={AllUserList} />
          <Stack.Screen name="AllGroups" component={AllGroupsscreen} />
          <Stack.Screen name="GroupProfile" component={GroupProfile} />
          <Stack.Screen
            name="GroupChatDashboard"
            component={GroupChatDashboard}
          />

          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
