import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BottomNavBar from '../navigation/BottomNavBar';

const Tab = createMaterialTopTabNavigator();

const UsersListScreen = ({ chatUsers, handleUserClick, renderStatusIndicator }) => {
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
              <Image source={item.profileImg} style={styles.userImage} />
              {renderStatusIndicator(item.status)}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <View style={styles.messageDetails}>
              <View style={styles.messageCountContainer}>
                <Text style={styles.messageCount}>{item.messageCount}</Text>
              </View>
              <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const GroupsListScreen = ({ chatGroups }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chatGroups}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupItem}>
            <Image source={item.profileImg} style={styles.groupImage} />
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{item.name}</Text>
              <Text style={styles.groupMembers}>{item.userCount} members</Text>
            </View>
            <View style={styles.messageDetails}>
              <View style={styles.messageCountContainer}>
                <Text style={styles.messageCount}>{item.messageCount}</Text>
              </View>
              <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const ChatUserLists = () => {
  const navigation = useNavigation();

  const [chatUsers, setChatUsers] = useState([]);
  const [chatGroups, setChatGroups] = useState([]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [toggleState, setToggleState] = useState(false); // Default state is false (As User)

  useEffect(() => {
    // Sample user data
    const fetchedChatUsers = [
      {
        id: '1',
        name: 'Johan Smith',
        profileImg: require('../assets/user1.png'),
        lastMessage: 'Hello there!',
        messageCount: 5,
        status: 'active',
        lastMessageTime: '10:30 AM', // Add last message time
      },
      {
        id: '2',
        name: 'Ap Singh',
        profileImg: require('../assets/user2.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'away',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '3',
        name: 'Malton',
        profileImg: require('../assets/user3.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'away',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '4',
        name: 'James',
        profileImg: require('../assets/user4.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'away',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '5',
        name: 'Jack',
        profileImg: require('../assets/user5.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
       lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '6',
        name: 'William',
        profileImg: require('../assets/user6.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '7',
        name: 'Michael',
        profileImg: require('../assets/user7.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
       lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '8',
        name: 'Danial',
        profileImg: require('../assets/user8.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '9',
        name: 'Joseph',
        profileImg: require('../assets/user1.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '10',
        name: 'George',
        profileImg: require('../assets/user3.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '11',
        name: 'Joseph',
        profileImg: require('../assets/user7.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      {
        id: '12',
        name: 'Emma',
        profileImg: require('../assets/user4.png'),
        lastMessage: 'Hi, how are you?',
        messageCount: 2,
        status: 'active',
        lastMessageTime: 'Yesterday', // Add last message time
      },
      // Add more user data here
    ];

    // Sample group data
    const fetchedChatGroups = [
      {
        id: '1',
        name: 'Group 1',
        profileImg: require('../assets/user1.png'),
        userCount: 5,
        messageCount: 10,
      },
      {
        id: '2',
        name: 'Group 2',
        profileImg: require('../assets/user1.png'),
        userCount: 3,
        messageCount: 5,
      },
      // Add more group data here
    ];

    setChatUsers(fetchedChatUsers);
    setChatGroups(fetchedChatGroups);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return '#0F0';
      case 'offline':
        return '#F00';
      case 'away':
        return 'gray';
      default:
        return '#777';
    }
  };

  const renderStatusIndicator = (status) => (
    <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(status) }]} />
  );

  const handleUserClick = (user) => {
    navigation.navigate('ChatDashboard', { user });
  };

  const shuffleChatUsers = () => {
    const shuffledUsers = [...chatUsers];
    for (let i = shuffledUsers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledUsers[i], shuffledUsers[j]] = [shuffledUsers[j], shuffledUsers[i]];
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
    return toggleState ? 'As Club' : 'As User';
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>
            Hello {toggleState ? 'Club' : 'User'} Chats
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleShuffle}>
            <FontAwesome name={isShuffled ? 'toggle-on' : 'toggle-off'} size={32} color="#000" />
            <Text style={styles.toggleText}>{renderToggleText()}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tab.Navigator>
        <Tab.Screen name="Direct Chat">
          {() => (
            <UsersListScreen
              chatUsers={chatUsers}
              handleUserClick={handleUserClick}
              renderStatusIndicator={renderStatusIndicator}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Group Chat">
          {() => <GroupsListScreen chatGroups={chatGroups} />}
        </Tab.Screen>
      </Tab.Navigator>
      <BottomNavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffb0',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#efefef',
    borderWidth: 1,
  },
  groupImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#efefef',
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
    fontWeight: 'bold',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#777',
  },
  lastMessageTime: {
    color: '#777',
  },
  userCount: {
    color: '#777',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  statusContainer: {
    marginRight: 8,
    marginBottom: 8,
  },
  messageCountContainer: {
    backgroundColor: '#00c0ff',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageCount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  timingText: {
    color: '#777',
    marginLeft: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    backgroundColor: '#fff',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    marginLeft: 10,
  },
  backButton: {
    marginRight: 10,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '800',
  },
});

export default ChatUserLists;
