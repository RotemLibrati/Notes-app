import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NoteList = (props) => {
    const navigation = useNavigation();
    const DetailsNote = (item) => {
        navigation.navigate("NoteScreen", { note: item });
    }
    return (
        <React.Fragment>
            <Text style={[AppStyles.subTitle, { marginTop: 15 }]}>Notes List</Text>
            <View>
                <View style={styles.boxes}>
                    {props.notes.length === 0 ? <Text>There are no notes</Text> :
                        <ScrollView>
                            {props.notes.map((note) => (
                                <TouchableOpacity style={styles.note}
                                    onPress={() => DetailsNote(note)}>
                                    <View style={{flexDirection: 'row'  }}>
                                        <MaterialCommunityIcons name="note" size={24} color="black" style={{ marginRight: 15, marginTop: 5}}/>
                                        <Text>Subject: {note.title + "\n"}
                                            Date: {note.date.toDate().toLocaleDateString()}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            ))}
                        </ScrollView>}
                </View>

            </View>
        </React.Fragment>
    )
}
const styles = StyleSheet.create({
    boxes: {
        backgroundColor: '#e4e6eb',
        height: 200,
        margin: 16,
        borderRadius: 16,
        width: 300,
        alignItems: 'center'
    },
    note: {
        borderColor: 'lightgrey',
        borderRadius: 40,
        borderWidth: 2,
        margin: 2,
        width: 270,
        alignItems: 'center',
        marginBottom: 3,
        marginTop: 3
    }
})
export default NoteList;