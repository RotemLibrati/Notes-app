import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../components/styles/AppStyles';
import * as firebase from '../firebase';
import CreateNote from '../components/Notes/CreateNote';
import { useNavigation } from '@react-navigation/native';
import EditNote from '../components/Notes/EditNote';
const NoteScreen = ({ route }) => {
    let note;
    try{
        note = route.params.note;
    } catch {
        note = null;
    }
    return (
        <ScrollView>
            <View style={AppStyles.customContainer}>
                {!note ? (
                    <React.Fragment>
                        <Text style={AppStyles.title}>Create New Note</Text>
                        <CreateNote />
                    </React.Fragment>
                )
                    : <EditNote note={note}/>}
            </View>
        </ScrollView>
    )
};

export default NoteScreen;