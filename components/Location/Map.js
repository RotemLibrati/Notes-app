import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { auth } from '../../firebase';
import * as firebase from '../../firebase';
const Map = () => {
    const [notes, setNotes] = useState([]);
    const [region, setRegion] = useState({
        latitude: 32.109333,
        longitude: 34.855499,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebase.getNotesByEmail("notes", auth.currentUser?.email)
            .then(function (notesList) {
                setNotes(firebase.getSortedArrayDateFromDict(notesList));
                setIsLoading(false);
            })
            .catch(error => alert(error.message));
    }, [notes]);
    let lat, lng;
    try {
        lat = notes[0].location.lat;
        lng = notes[0].location.lng;
    } catch (e) {
        lat = 32.109333;
        lng = 34.855499;
    }
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            >
                {isLoading ? <></> :
                    notes.map((note) => (
                        <MapView.Marker
                            coordinate={{
                                latitude: note.location.lat,
                                longitude: note.location.lng
                            }}
                            title={note.title}
                            description={note.body}
                        />))}
            </MapView>
        </View >
    )
};

export default Map;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});