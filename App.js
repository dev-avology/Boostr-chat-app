// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ChatUserLists from './src/screens/chats'
import ChatDashboard from './src/screens/ChatDashboard';
import UserProfile from './src/screens/UserProfile'
import SelectProfileScreen from './src/screens/SelectProfile'
import ClubList from './src/screens/ClubList'
import SettingsPage from './src/screens/Settings'
import AllUserList from './src/screens/AllUsers'
import AllGroupsscreen from './src/screens/AllGroups'
import GroupProfile from './src/screens/GroupProfile'
import GroupChatDashboard from './src/screens/GroupChatDashboard'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ChatUserLists" component={ChatUserLists} />
        <Stack.Screen name="ChatDashboard" component={ChatDashboard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="SelectProfile" component={SelectProfileScreen} />
        <Stack.Screen name="ClubList" component={ClubList} />
        <Stack.Screen name="SettingsPage" component={SettingsPage} />
        <Stack.Screen name="AllUserList" component={AllUserList} />
        <Stack.Screen name="AllGroups" component={AllGroupsscreen} />
        <Stack.Screen name="GroupProfile" component={GroupProfile} />
        <Stack.Screen name="GroupChatDashboard" component={GroupChatDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
