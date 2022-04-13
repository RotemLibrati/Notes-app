import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppStyles } from '../styles/AppStyles';
import * as firebase from '../../firebase';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Spinner from '../Spinner/Spinner';
const CreateNote = (props) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [date, setDate] = useState(new Date());
    const [pickedLocation, setPickedLocation] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isDateOpen, setIsDateOpen] = useState(false);

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
                alert("There is no have permmision");
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
            await firebase.AddeNewNoteToFirestore(title, body, date, uuidv4(), pickedLocation)
                .then(alert("You created a new note"))
                .then(navigation.goBack())
                .catch((error) => alert(error.message));
        };
        if (pickedLocation && isLoading) {
            handleFirebase();
        }
    }, [pickedLocation, isLoading]);
    const handleCreateNote = async () => {
        setIsLoading(true);
    };
    const handleSetDate = (event, d) => {
        if(event.type === 'set'){
            setDate(d);
        } else {
            date = new Date().toDateString();
        };
        setIsDateOpen(false);
    };
    const handleSetDateForAndroid = () => {
        setIsDateOpen(true);
    };
    return (
        <React.Fragment>
            <ScrollView style={[AppStyles.inputContainer, { marginTop: 20 }]}>
                <TextInput
                    placeholder='Note Title'
                    value={title}
                    onChangeText={text => setTitle(text)}
                    style={[AppStyles.input, { marginBottom: 20 }]}
                />
                <TextInput
                    style={[AppStyles.input, { marginBottom: 20, height: 200 }]}
                    placeholder="Note Body "
                    onChangeText={text => setBody(text)}
                    value={body}
                    multiline={true}
                />

                {Platform.OS === 'ios' ?
                    <React.Fragment>
                        <Text style={AppStyles.subTitle}>Select a Date</Text>
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
                        />}
                    </React.Fragment>}
            </ScrollView>

            <View style={AppStyles.buttonContainer}>
                {isLoading ? <Spinner /> :
                    <TouchableOpacity onPress={handleCreateNote}
                        style={AppStyles.button}>
                        <Text style={AppStyles.buttonText}>Save</Text>
                    </TouchableOpacity>}
            </View>


        </React.Fragment>
    )
};

export default CreateNote;