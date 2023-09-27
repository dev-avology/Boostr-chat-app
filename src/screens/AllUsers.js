import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomNavBar from '../navigation/BottomNavBar';
import { checkUserData } from './authUtils';

const Stack = createStackNavigator();

const AllUserListScreen = () => {
  const navigation = useNavigation();

  const [chatUsers, setChatUsers] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await checkUserData('https://staging3.booostr.co/wp-json/chat-api/v1/chat_user_get_list_of_contacts');
      console.log('Fetched user data:', user);
      if (user) {
        setUserData(user);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchedChatUsers = [
      {
        id: '1',
        name: 'John Doe',
        profileImg: require('../assets/user3.png'),
        lastMessage: 'Hello there!',
        status: 'active',
      },
      {
        id: '2',
        name: 'Jane Smith',
        profileImg: require('../assets/user2.png'),
        lastMessage: 'Hi, how are you?',
        status: 'away',
      },
      {
        id: '3',
        name: 'Trump',
        profileImg: require('../assets/user5.png'),
        lastMessage: 'Hello there!',
        status: 'active',
      },
      {
        id: '4',
        name: 'Jack',
        profileImg: require('../assets/user6.png'),
        lastMessage: 'Hi, how are you?',
        status: 'away',
      },
      // Add more user data here
    ];

    setChatUsers(fetchedChatUsers);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Contact</Text>
      </View>
      <FlatList
        data={chatUsers}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
          >
            {userData ? (
              <>
            <View style={styles.statusContainer}>
              <Image source={item.profileImg} style={styles.userImage} />
              {renderStatusIndicator(item.status)}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.user_nicename}</Text>
              <Text style={styles.lastMessage}>{userData.user_status}</Text>
            </View>
            </>
            ) : null }
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  userItem: {
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
  userInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessage: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 25,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    backgroundColor: '#fff',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginRight: 10,
  },
});

export default AllUserListScreen;
