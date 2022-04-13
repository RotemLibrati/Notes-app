import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import { auth, signOut } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import * as firebase from '../firebase'
import { AppStyles } from '../components/styles/AppStyles';
import NoteList from '../components/Notes/NoteList';
import Spinner from '../components/Spinner/Spinner';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import LocationPicker from '../components/Location/LocationPicker';
import MessageDialog from '../components/Messages/MessageDialog';


const MainScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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
  useEffect(() => {
    firebase.getNotesByEmail("notes", auth.currentUser?.email)
      .then(function (notesList) {
        setNotes(firebase.getSortedArrayDateFromDict(notesList));
        setIsLoading(false);
      })
      .catch(error => alert(error.message));
  }, [notes]);
  useEffect(() => {
    setModalVisible(true)
  },[]);
  return (
      <ScrollView>
      {modalVisible && <MessageDialog setModalVisible={setModalVisible} modalVisible={modalVisible} />}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={AppStyles.title}> Hello {auth.currentUser?.email}</Text>

        {isLoading ? <Spinner /> : <NoteList notes={notes} />}
        <LocationPicker />
        <TouchableOpacity style={styles.button}
          onPress={handleSignOut}>
          <Text style={AppStyles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="New Note" onPress={hanldeNewNote}>
            <Icon name="md-create" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </ScrollView>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0782F9',
    width: '55%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
})