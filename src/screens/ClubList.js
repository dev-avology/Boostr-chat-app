import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SectionList,
  TextInput,
} from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons'; // Import icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from react-navigation/native
import BottomNavBar from '../navigation/BottomNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ClubList = () => {
  const navigation = useNavigation(); // Initialize navigation

  const [clubs, setClubs] = useState([]);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUserData = async () => {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const parsedUserData = JSON.parse(value);
        setUserData(parsedUserData); // Set the userData state with the parsed data
      }
    };

    checkUserData();
  }, []);


  
  useEffect(() => {
    // Fetch your club data and update clubs state
    // Replace this with your actual data fetching logic
    const fetchedClubs = [
      {
        id: '1',
        name: 'Club 1',
        clubImg: require('../assets/user1.png'),
        members: 10,
      },
      {
        id: '2',
        name: 'Club 2',
        clubImg: require('../assets/user2.png'),
        members: 20,
      },
      {
        id: '3',
        name: 'Club 3',
        clubImg: require('../assets/user4.png'),
        members: 15,
      },
      {
        id: '4',
        name: 'Club 4',
        clubImg: require('../assets/user3.png'),
        members: 5,
      },
      {
        id: '5',
        name: 'Club 5',
        clubImg: require('../assets/user5.png'),
        members: 15,
      },
      {
        id: '6',
        name: 'Club 6',
        clubImg: require('../assets/user7.png'),
        members: 15,
      },
      {
        id: '8',
        name: 'Club 8',
        clubImg: require('../assets/user8.png'),
        members: 15,
      },
      // ... (other clubs)
    ];

    setClubs(fetchedClubs);
  }, []);

  const handleClubClick = (club) => {
    navigation.navigate('ChatUserLists', { club });
  };

  // Commenting out the renderSearchBar function and its call
  /*
  const renderSearchBar = () => {
    if (isSearchBarVisible) {
      return (
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs"
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
          <TouchableOpacity onPress={closeSearchBar}>
            <FontAwesome name="times" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={styles.iconButton} onPress={toggleSearchBar}>
          <FontAwesome name="search" size={22} color="#000" />
        </TouchableOpacity>
      );
    }
  };
  */

  const closeSearchBar = () => {
    setIsSearchBarVisible(false);
    setSearchText(''); // Clear the search input text
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.clubItem} onPress={() => handleClubClick(item)}>
      <View style={styles.clubImageContainer}>
        <Image source={item.clubImg} style={styles.clubImage} />
      </View>
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.membersCount}>{item.members} Members</Text>
      </View>
    </TouchableOpacity>
  );

  const sections = [
    {
      data: clubs,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Select a Club {userData?.display_name}</Text>
          <Text style={styles.wrapText}>Choose a club you support or manage to join a chat.</Text>
        </View>
        <View style={styles.headerRight}>
          {/* Commenting out the renderSearchBar call */}
          {/* {renderSearchBar()} */}
        </View>
      </View>
      {isSearchBarVisible && (
        <View style={styles.searchBarSpace} />
      )}
      <View style={styles.clubListContainer}>
        <SectionList
          sections={sections}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffb0',
  },
  clubListContainer: {
    flex: 1,
  },
  clubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  wrapText:{
    fontSize:14,
    color: '#777',
  },
  clubImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden', // Clip club image to the border radius
  },
  clubImage: {
    width: '100%',
    height: '100%',
  },
  clubInfo: {
    flex: 1,
    marginLeft: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  membersCount: {
    color: '#777',
  },
  top_main: {
    flex: 1,
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
    marginLeft: 10, // Add margin between the icons
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#efefef',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchBarSpace: {
    height: 10, // Adjust the height to create space for the search bar
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
  },
});

export default ClubList;
