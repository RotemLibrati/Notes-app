import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../components/styles/AppStyles';
import * as firebase from '../firebase';
import CreateNote from '../components/Notes/CreateNote';
const NoteScreen = () => {
    const [title, setTitle] = useState('');
    return (
        <ScrollView>
            <View style={AppStyles.customContainer}>
                <Text style={AppStyles.title}>Create New Note</Text>
                <CreateNote />
            </View>
        </ScrollView>
    )
};

export default NoteScreen;