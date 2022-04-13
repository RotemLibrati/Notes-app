import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../styles/AppStyles';
import * as firebase from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Spinner from '../Spinner/Spinner';


const EditNote = (props) => {
    const navigation = useNavigation();
    let note = props.note;
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const [date, setDate] = useState(note.date.toDate());
    const [pickedLocation, setPickedLocation] = useState();
    const [isDateOpen, setIsDateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleEditNote = async () => {
        setIsLoading(true);
    };
    const handleDeleteNote = async () => {
        firebase.deleteNoteById("notes", note._id)
            .then(navigation.goBack())
            .catch((error) => alert(error.message));
    };
    const handleSetDate = (event, d) => {
        if (event.type === 'set') {
            setDate(d);
        } else {
            date = new Date().toDateString();
        };
        setIsDateOpen(false);
    };
    const handleSetDateForAndroid = () => {
        setIsDateOpen(true);
    };
    useEffect(() => {
        const verifyPermissions = async () => {
            const result = await Permissions.askAsync(Permissions.LOCATION);
            if (result.status !== 'granted') {
                alert("No Permission");
                return false;
            }
            return true;
        };
        const handleLocation = async () => {
            const hasPermission = await verifyPermissions();
            if (!hasPermission) {
                alert("Permission does not exist");
                return;
            }
            try {
                const location = await Location.getCurrentPositionAsync({
                    timeout: 5000
                });
                setPickedLocation({
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                });
            } catch (err) {
                alert(error.message);
            };
        };
        handleLocation();
    }, []);
    useEffect(() => {
        const handleFirebase = async () => {
            let updateData = {
                "title": title,
                "body": body,
                "date": date,
                "location": pickedLocation
            };
            await firebase.updateNoteDetails("notes", note, updateData)
                .then(alert("You update your note"))
                .then(navigation.goBack())
                .catch((error) => alert(error.message));
        };
        if (pickedLocation && isLoading) {
            handleFirebase();
        }
    }, [pickedLocation, isLoading]);
    return (
        <React.Fragment>
            <ScrollView style={[AppStyles.inputContainer, { marginTop: 20 }]}>
                <TextInput
                    placeholder={title}
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={[AppStyles.input, { marginBottom: 20 }]}
                />
                <TextInput
                    style={[AppStyles.input, { marginBottom: 20, height: 200 }]}
                    placeholder={body}
                    onChangeText={text => setBody(text)}
                    value={body}
                    multiline={true}
                />
                <Text style={AppStyles.subTitle}>Select a Date</Text>
                {Platform.OS === 'ios' ?
                    <React.Fragment>
                        <DateTimePicker mode="date"
                            display='spinner'
                            value={date}
                            onChange={handleSetDate}
                            minimumDate={new Date()}
                        />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <TouchableOpacity onPress={handleSetDateForAndroid}
                            style={AppStyles.button}>
                            <Text style={AppStyles.buttonText}>{date.toDateString()}</Text>
                        </TouchableOpacity>
                        {isDateOpen &&
                            <DateTimePicker
                                mode='date'
                                display='default'
                                value={date}
                                onChange={handleSetDate}
                                minimumDate={new Date()}
                            />}
                    </React.Fragment>}
            </ScrollView>
            <View style={AppStyles.buttonContainer}>
                {isLoading ? <Spinner /> :
                    <TouchableOpacity onPress={handleEditNote}
                        style={AppStyles.button}>
                        <Text style={AppStyles.buttonText}>Edit</Text>
                    </TouchableOpacity>}
            </View>
            <View style={[AppStyles.buttonContainer, { marginTop: 20 }]}>
                <TouchableOpacity onPress={handleDeleteNote}
                    style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    );
};

export default EditNote;

const styles = StyleSheet.create({});