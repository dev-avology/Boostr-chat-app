import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import user1Img from '../assets/user3.png';
import bgImg from '../assets/chat-bg.png';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../navigation/BottomNavBar';

const UserProfile = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  // Sample club list with roles
  const clubList = [
    { name: 'Club 1', role: 'Member' },
    { name: 'Club 2', role: 'Moderator' },
    { name: 'Club 3', role: 'Admin' },
    { name: 'Club 4', role: 'Member' },
    { name: 'Club 5', role: 'Moderator' },
    { name: 'Club 6', role: 'Admin' },
  ];

  return (
    <ImageBackground style={styles.img_top} source={bgImg} resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#000" style={styles.backIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Image source={user1Img} style={styles.userImage} />
          <Text style={styles.userName}>George</Text>
          <Text style={styles.userStatus}>active</Text>
          <Text style={styles.emailText}>Youremail@gmail.com</Text>
          <ScrollView style={styles.clubListContainer}>
            {/* Mapping the club list */}
            {clubList.map((club, index) => (
              <TouchableOpacity
                style={styles.clubListItem}
                key={index}
                onPress={() => {
                  // Handle club item click here
                  alert(`Clicked on ${club.name}`);
                }}
              >
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubRole}>{club.role}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  card: {
    width: '80%',
    paddingHorizontal: 20,
    paddingVertical: 40,
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
    width: '100%',
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
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  clubListContainer: {
    marginTop: 20,
    width: '100%',
    maxHeight: 200,
  },
  clubListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderColor: '#efefef',
    borderBottomWidth: 1,
  },
  clubName: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clubRole: {
    color: '#777',
    fontSize: 16,
  },
  backButton: {
    marginLeft: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
});

export default UserProfile;
