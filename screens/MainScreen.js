import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth, signOut } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as firebase from '../firebase'
import { AppStyles } from '../components/styles/AppStyles';
import NoteList from '../components/Notes/NoteList';

const MainScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
    .signOut(firebase.auth)
    .then(() => {
      navigation.replace("Login");
    })
    .catch(error => alert(error.message));
  };

  const hanldeNewNote = () => {
    navigation.navigate("NoteScreen");
  };
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.title}> Welcome {auth.currentUser?.email}</Text>
      <NoteList />
      <TouchableOpacity style={styles.button}
      onPress={handleSignOut}>
        <Text style={AppStyles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}
      onPress={hanldeNewNote}>
        <Text style={AppStyles.buttonText}>Create new note</Text>

      </TouchableOpacity>

    </View>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
})