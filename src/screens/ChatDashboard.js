import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  BackHandler,
  ImageBackground,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import bgImg from "../assets/chat-bg.png";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useDispatch, useSelector } from "react-redux";
import { memoizedSelectUserData, memoizeduserMessages } from "../selectors";
import { fetchUserMessages, autofetchUserMessages } from "../reducers/chatMessagesSlice";

const YOUR_REFRESH_INTERVAL = 5000;

const ChatDashboard = ({ route, navigation }) => {
  const [messages1, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const flatlistRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector(memoizedSelectUserData);
  const messages = useSelector(memoizeduserMessages);
  const loading = useSelector((state) => state.userMessages.loading);

  const conversation = route.params.conversation;
  const asUser = route.params.asUser;
  const user = conversation.participants.find(
    (participant) => participant.user_id !== userData?.user_id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (asUser) {
          dispatch(fetchUserMessages(conversation?.id, asUser));
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      } finally{
      }
    };
    const autofetchData = async () => {
      try {
        if (asUser) {
          dispatch(autofetchUserMessages(conversation?.id, asUser));
          
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      } finally{
      }
    };


    fetchData();

     const refreshInterval = setInterval(() => {
      autofetchData();
    }, YOUR_REFRESH_INTERVAL);

    return () => {
      clearInterval(refreshInterval);
    };

  }, [dispatch, navigation, asUser, conversation]);
  useEffect(() => {

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const sendMessage = () => {
    if (messageText.trim() === "") {
      return;
    }

    const newMessage = {
      id: String(messages.length + 1),
      content: messageText,
      sender_id: asUser,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
    flatlistRef.current.scrollToEnd();
  };

  const goToUserProfile = () => {
    navigation.navigate("UserProfile", { asUser });
  };

  return (
    <ImageBackground style={styles.img_top} source={bgImg} resizeMode="cover">
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              size={24}
              color="#000"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToUserProfile}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: user?.user_photo }}
                style={styles.userImage}
              />
              <View>
                <Text style={styles.userName}>
                  {conversation?.conversation_type == 'group' ? conversation?.conversation_name : user?.first_name + '' + user?.last_name}
                </Text>
                <Text style={styles.userStatus}>{user?.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.messageContainer}>
          {loading ? 
            <View style={styles.containerLoader}>
              <ActivityIndicator size="large" color="#000" />
            </View> : <FlatList
            ref={flatlistRef}
            data={messages}
            keyExtractor={(item) => item.id}
            onContentSizeChange={() => {
              flatlistRef.current.scrollToEnd({ animated: true });
            }}
            onLayout={() => {
              flatlistRef.current.scrollToEnd({ animated: true });
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  alignSelf:
                    item.sender_id == asUser ? "flex-end" : "flex-start",
                }}
              >
                <View
                  style={[
                    styles.message,
                    {
                      alignSelf:
                        item.sender_id == asUser ? "flex-end" : "flex-start",
                      backgroundColor:
                        item.sender_id == asUser ? "#00c0ff" : "#fff",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      {
                        color: item.sender_id == asUser ? "#fff" : "#333",
                      },
                    ]}
                  >
                    {item.content}
                  </Text>
                </View>
                {item.sender_id != asUser ? (
                  <Image
                    source={{ uri: item?.user_photo }}
                    style={styles.userProfileImage}
                  />
                ) : null}
              </View>
            )}
          />
          }
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ios-happy" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="attach-file" size={24} color="#555" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img_top: {
    height: "100%",
  },
  containerLoader:{
    flex:1,
    alignItems: "center",
    justifyContent:"center"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#fff",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "#efefef",
    borderWidth: 1,
    marginHorizontal: 10,
  },
  userProfileImage: {
    width: 20,
    height: 20,
    borderRadius: 25,
    borderColor: "#efefef",
    borderWidth: 1,
    marginHorizontal: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userStatus: {
    fontSize: 14,
    color: "#777",
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 6,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderColor: "#efefef",
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginRight: 10,
    paddingVertical: 16,
  },
  sendButton: {
    backgroundColor: "#00c0ff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconButton: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatDashboard;
