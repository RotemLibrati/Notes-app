import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AppStyles } from '../styles/AppStyles';
import * as firebase from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
const CreateNote = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState(new Date());
    const handleCreateNote = async () => {
        await firebase.AddeNewNoteToFirestore(title, body, date);
        navigation.goBack();
    };
    const handleSetDate = (event, date) => {
        setDate(date);
        alert(date);
    }
    return (
        <React.Fragment>
            <View style={[AppStyles.inputContainer, { marginTop: 20 }]}>
                <TextInput
                    placeholder='Note Title'
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={[AppStyles.input, {marginBottom: 20}]}
                />
                <TextInput
                        style={[AppStyles.input, {marginBottom: 20, height: 200}]}
                        placeholder="Note Body "
                        onChangeText={text => setBody(text)}
                        value={body}
                        multiline={true}
                    />
                <Text style={AppStyles.subTitle}>Select a Date</Text>
                <DateTimePicker mode="date"
                    display='spinner'
                    value={date}
                    onChange={handleSetDate}
                />
            </View>
            <View style={AppStyles.buttonContainer}>
                <TouchableOpacity onPress={handleCreateNote}
                    style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
};

export default CreateNote;