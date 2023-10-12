// App.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ChatUserLists from "./src/screens/chats";
import ChatDashboard from "./src/screens/ChatDashboard";
import UserProfile from "./src/screens/UserProfile";
import SelectProfileScreen from "./src/screens/SelectProfile";
import ClubList from "./src/screens/ClubList";
import SettingsPage from "./src/screens/Settings";
import AllUserListScreen from "./src/screens/AllUsers";
import AllGroupsscreen from "./src/screens/AllGroups";
import GroupProfile from "./src/screens/GroupProfile";
import GroupChatDashboard from "./src/screens/GroupChatDashboard";
import { fetchUserData } from "./src/reducers/loginReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
import { View, StyleSheet, StatusBar } from "react-native";
const Stack = createNativeStackNavigator();

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const storedUserId = await AsyncStorage.getItem("user_id");
      try {
        if (storedUserId) {
          dispatch(fetchUserData(storedUserId));
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [dispatch]);
  if (loading && !isLoggedIn)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <View style={styles.container}>
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
            <Stack.Screen
              name="SelectProfile"
              component={SelectProfileScreen}
            />
            <Stack.Screen name="SettingsPage" component={SettingsPage} />
            <Stack.Screen name="AllUserList" component={AllUserListScreen} />
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
      </View>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
