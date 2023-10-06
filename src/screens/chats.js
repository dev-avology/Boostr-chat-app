import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BottomNavBar from "../navigation/BottomNavBar";
import { memoizedSelectUserData, memoizedConversations } from "../selectors";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchConversationsList } from "../reducers/conversationSlice";
const Tab = createMaterialTopTabNavigator();

const UsersListScreen = ({
  chatUsers,
  handleUserClick,
  renderStatusIndicator,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => handleUserClick(item)}
          >
            <View style={styles.statusContainer}>
              <Image source={item?.profileImg} style={styles.userImage} />
              {renderStatusIndicator(item?.status)}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item?.first_name} {item?.last_name}
              </Text>
              <Text style={styles.lastMessage}>{item?.lastMessage}</Text>
            </View>
            <View style={styles.messageDetails}>
              <View style={styles.messageCountContainer}>
                <Text style={styles.messageCount}>{item?.unread_count}</Text>
              </View>
              <Text style={styles.lastMessageTime}>
                {item?.lastMessageTime}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

const GroupsListScreen = ({ chatGroups }) => {
  const navigation = useNavigation();
  const goToGroupss = () => {
    navigation.navigate("GroupChatDashboard");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={chatGroups}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupItem} onPress={goToGroupss}>
            <Image source={item.profileImg} style={styles.groupImage} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.groupMembers}>
                {item?.participants?.length} members
              </Text>
            </View>
            <View style={styles.messageDetails}>
              <View style={styles.messageCountContainer}>
                <Text style={styles.messageCount}>{item.unread_count}</Text>
              </View>
              <Text style={styles.lastMessageTime}>
                {item?.lastMessageTime}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const ChatUserLists = ({ route, navigation }) => {
  const club = route.params.club;
  const userData = useSelector(memoizedSelectUserData);
  const Conversations = useSelector(memoizedConversations);
  const loading = useSelector((state) => state.conversations.loading);
  const error = useSelector((state) => state.conversations.error);

  const [chatUsers, setChatUsers] = useState([]);
  const [chatGroups, setChatGroups] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [toggleState, setToggleState] = useState(true);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          if (toggleState) {
            UserID = userData?.user_id;
          } else {
            UserID = club?.post_id;
          }

          if (UserID) {
            dispatch(fetchConversationsList(UserID, club?.post_id));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [toggleState])
  );

  useEffect(() => {
    setChatUsers(Conversations?.user_conversations);
    setChatGroups(Conversations?.group_conversations);
  }, [Conversations, loading, error]);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "#0F0";
      case "offline":
        return "#F00";
      case "away":
        return "gray";
      default:
        return "#777";
    }
  };

  const renderStatusIndicator = (status) => (
    <View
      style={[
        styles.statusIndicator,
        { backgroundColor: getStatusColor(status) },
      ]}
    />
  );

  const handleUserClick = (user) => {
    navigation.navigate("ChatDashboard", { user });
  };

  const shuffleChatUsers = () => {
    const shuffledUsers = [...chatUsers];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [
        shuffledUsers[j],
        shuffledUsers[i],
      ];
    }
    setChatUsers(shuffledUsers);
    setIsShuffled(true);
  };

  const toggleShuffle = () => {
    setToggleState(!toggleState);
    setIsShuffled(false);
    if (!toggleState) {
      shuffleChatUsers();
    }
  };

  const renderToggleText = () => {
    return toggleState ? "As Club" : "As User";
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>
            Hello{" "}
            {toggleState
              ? userData?.first_name + " " + userData?.last_name
              : club?.post_title}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShuffle}>
            <FontAwesome
              name={isShuffled ? "toggle-on" : "toggle-off"}
              size={32}
              color="#000"
            />
            <Text style={styles.toggleText}>{renderToggleText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <View style={styles.containerLoader}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Direct Chat">
            {() =>
              chatUsers?.length > 0 ? (
                <UsersListScreen
                  chatUsers={chatUsers}
                  handleUserClick={handleUserClick}
                  renderStatusIndicator={renderStatusIndicator}
                />
              ) : (
                <Text style={styles.notFound}>No direct chats found.</Text>
              )
            }
          </Tab.Screen>
          <Tab.Screen name="Group Chat">
            {() =>
              chatGroups?.length > 0 ? (
                <GroupsListScreen chatGroups={chatGroups} />
              ) : (
                <Text style={styles.notFound}>No group chats found.</Text>
              )
            }
          </Tab.Screen>
        </Tab.Navigator>
      )}
      <BottomNavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffb0",
  },
  notFound:{
    textAlign:'center',
    fontSize:20,
    padding:20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#efefef",
    borderWidth: 1,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#efefef",
    borderWidth: 1,
  },
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  groupInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#777",
  },
  lastMessageTime: {
    color: "#777",
  },
  userCount: {
    color: "#777",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  statusContainer: {
    marginRight: 8,
    marginBottom: 8,
  },
  messageCountContainer: {
    backgroundColor: "#00c0ff",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  messageCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  timingText: {
    color: "#777",
    marginLeft: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#fff",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  toggleText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: "800",
  },
  containerLoader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatUserLists;
