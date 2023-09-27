import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import user1Img from '../assets/user3.png';
import bgImg from '../assets/chat-bg.png';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../navigation/BottomNavBar';
import { checkUserData } from './authUtils';

const SettingsPage = () => {
  const navigation = useNavigation();
 
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const user = await checkUserData();
      //console.log('Fetched user data:', user);
      if (user) {
        setUserData(user);
      }
    };

    fetchUserData();
  }, []);


  const handleChangeName = () => {
    // Add logic for changing name here
  };

  const handleChangePassword = () => {
    // Add logic for changing password here
  };

  const handleChangeEmail = () => {
    // Add logic for changing email here
  };

  const handleLogout = () => {
    // Add logic for logout here
  };

  const handleBack = () => {
    navigation.goBack();
  };


  return (
    <ImageBackground style={styles.img_top} source={bgImg} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#000" style={styles.backIcon} />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Settings</Text>
         </View>
        </View>
        <View style={styles.card}>
        {userData ? (
          <>
          <Image source={user1Img} style={styles.userImage} />
          <Text style={styles.userName}>{userData.display_name}</Text>
          <Text style={styles.userStatus}>{userData.user_email}</Text>
          </>
        ) : null}

        <View style={styles.mainBox}>
          
          <TouchableOpacity style={styles.optionButton} onPress={handleChangePassword}>
            <Text style={styles.optionButtonText}>Change Password</Text>
          </TouchableOpacity>
        
          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Text style={styles.optionButtonText}>Logout</Text>
          </TouchableOpacity>
      
        </View>
        </View>
      </View>
      <BottomNavBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainBox:{
    backgroundColor:'#f4f4f4',
    width:'100%',
    marginTop:15,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:10,
  },
  card:{
    width: '80%',
    paddingHorizontal:20,
    paddingVertical:40,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  img_top: {
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    backgroundColor: '#fff',
    zIndex: 1,
    width:'100%'
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#efefef',
    borderWidth: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userStatus: {
    fontSize: 18,
    color: '#777',
    marginTop: 5,
  },
  optionButton: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: '#efefef',
    borderBottomWidth: 1, 
    width:'100%',
  },
  optionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    width:'100%'
  },
  backButton: {
    marginLeft: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default SettingsPage;
