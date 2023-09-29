import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavBar from '../navigation/BottomNavBar';

const Stack = createNativeStackNavigator();

const AllGroupsScreen = () => {
  const navigation = useNavigation();

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchedGroups = [
      {
        id: '1',
        name: 'Group 1',
        selected: false,
        members: 4,
      },
      {
        id: '2',
        name: 'Group 2',
        selected: false,
        members: 3,
      },
      {
        id: '3',
        name: 'Group 3',
        selected: false,
        members: 15,
      },
      {
        id: '4',
        name: 'Group 4',
        selected: false,
        members: 10,
      },
      {
        id: '5',
        name: 'Group 5',
        selected: false,
        members: 8,
      },
      {
        id: '6',
        name: 'Group 6',
        selected: false,
        members: 9,
      },
      // Add more groups here
    ];

    setGroupList(fetchedGroups);
  }, []);

  const toggleGroupSelection = (groupId) => {
    setGroupList((prevList) =>
      prevList.map((group) =>
        group.id === groupId
          ? { ...group, selected: !group.selected }
          : { ...group, selected: false } // Deselect all other groups
      )
    );
  };

  const renderRadio = (groupId) => (
    <TouchableOpacity
      style={styles.radio}
      onPress={() => toggleGroupSelection(groupId)}
    >
      {groupList.find((group) => group.id === groupId).selected ? (
        <AntDesign name="checkcircle" size={20} color="#00c0ff" />
      ) : (
        <FontAwesome name="circle-thin" size={20} color="#00c0ff" />
      )}
    </TouchableOpacity>
  );

  const createGroup = () => {
    // Handle creating a new group here
    // You can navigate to a new screen or show a modal for creating a group
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Group</Text>
      </View>
      <FlatList
        data={groupList}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.groupItem}>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>
                {item.name}
              </Text>
              <Text style={styles.membersCount}>
                {item.members} members
              </Text>
            </View>
            {renderRadio(item.id)}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        title="Create Group"
        onPress={createGroup}
        color="#00c0ff" // Set the button's background color
        style={styles.createGroupButton} // Apply custom styles
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
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  membersCount: {
    fontSize: 14,
    color: '#777',
  },
  radio: {
    padding: 8,
  },
  header: {
    flexDirection: 'row',
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
  createGroupButton: {
    marginTop: 16,
    padding: 16,
    fontSize: 16,
  },
});

export default AllGroupsScreen;
