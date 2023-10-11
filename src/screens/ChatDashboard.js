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
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import bgImg from "../assets/chat-bg.png";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useDispatch, useSelector } from "react-redux";
import { memoizedSelectUserData, memoizeduserMessages } from "../selectors";
import {
  fetchUserMessages,
  autofetchUserMessages,
  sendMessage,
  addMessage,
} from "../reducers/chatMessagesSlice";
import * as ImagePicker from "expo-image-picker";

const YOUR_REFRESH_INTERVAL = 5000;

const ChatDashboard = ({ route, navigation }) => {
  const [messages1, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const flatlistRef = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector(memoizedSelectUserData);
  const messages = useSelector(memoizeduserMessages);
  const loading = useSelector((state) => state.userMessages.loading);

  const [isLoading, setIsLoading] = useState(false);

  const conversation = route.params.conversation;
  const asUser = route.params.asUser;
  const user = conversation.participants.find(
    (participant) => participant.user_id !== userData?.user_id
  );
  const recipient_ids = conversation?.participants.map((item) => item.user_id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (asUser) {
          dispatch(fetchUserMessages(conversation?.id, asUser));
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      } finally {
      }
    };
    const autofetchData = async () => {
      try {
        if (asUser) {
          dispatch(autofetchUserMessages(conversation?.id, asUser));
        }
      } catch (error) {
        //console.error("Error fetching data:", error);
      } finally {
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

  const sendMessage1 = () => {
    if (messageText.trim() === "") {
      return;
    }
/*
    setIsLoading(true);
    const newMessage = {
      content: messageText,
      sender_id: asUser,
      conversation_id: conversation?.id,
      message_type: "text",
      recipient_ids: recipient_ids,
      media_url: "",
      mentioned_user_ids: [],
    };

    dispatch(sendMessage(newMessage))
      .then((data) => {
        dispatch(addMessage(data.data.data));
        setMessageText("");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setIsLoading(false);
      });

    flatlistRef.current.scrollToEnd();
    */
  };

  const goToUserProfile = () => {
    navigation.navigate("UserProfile", { asUser });
  };

  const pickImage = async () => {
    /*let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      CameraType: 'Back',
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);
    if (!result.canceled) {
    }*/
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
                  {conversation?.conversation_type == "group"
                    ? conversation?.conversation_name
                    : user?.first_name + "" + user?.last_name}
                </Text>
                {user?.status ? <Text style={styles.userStatus}>{user?.status}</Text> : null}
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.messageContainer}>
          {loading ? (
            <View style={styles.containerLoader}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : (
            <FlatList
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
          )}
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="ios-happy" size={24} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
            <MaterialIcons name="attach-file" size={24} color="#555" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={messageText}
            onChangeText={(text) => setMessageText(text)}
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendMessage1}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
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
  containerLoader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:15,
    paddingTop: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
    backgroundColor: "#f7f7f7",
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  userImage: {
    width: 45,
    height: 45,
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
    marginHorizontal: 7,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  userName: {
    fontSize: 17,
    fontWeight: "600",
  },
  userStatus: {
    fontSize: 14,
    color: "#777",
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    marginTop: 8,
    marginBottom: 2,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 6,
    maxWidth: "70%",
  },
  messageText: {
    fontSize: 17,
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
