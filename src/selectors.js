import { createSelector } from "reselect";

const selectUserData = (state) => state.auth.userData;
const SelectclubList = (state) => state.clubList.clubs;
const SelectConversations = (state) => state.conversations.conversations;
const SelectuserMessages = (state) => state.userMessages.messages;

export const memoizedSelectUserData = createSelector(
  [selectUserData],
  (userData) => {
    try {
      if (userData) {
        const parseduserData = JSON.parse(userData);
        return parseduserData;
      }
    } catch (error) {
      //console.error("JSON parsing error:", error);
    }
    return [];
  }
);

export const memoizedSelectclubList = createSelector(
  [SelectclubList],
  (clubs) => {
    try {
      if (clubs) {
        const parsedClubs = JSON.parse(clubs);
        return parsedClubs;
      }
    } catch (error) {
      //console.error("JSON parsing error:", error);
    }
    return [];
  }
);

export const memoizedConversations = createSelector(
  [SelectConversations],
  (conversations) => {
    try {
      if (conversations) {
        const parsedConversations = JSON.parse(conversations);
        return parsedConversations;
      }
    } catch (error) {
      //console.error("JSON parsing error:", error);
    }
    return [];
  }
);

export const memoizeduserMessages = createSelector(
  [SelectuserMessages],
  (userMessages) => {
    try {
      if (userMessages) {
        const parseduserMessages = JSON.parse(userMessages);
        return parseduserMessages?.data?.messages;
      }
    } catch (error) {
      //console.error("JSON parsing error:", error);
    }
    return [];
  }
);
