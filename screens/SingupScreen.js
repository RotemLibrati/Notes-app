import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import * as firebase from '../firebase';
import { AppStyles } from '../components/styles/AppStyles';

const SingupScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignUp = () => {
        createUserWithEmailAndPassword(firebase.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                signInWithEmailAndPassword(firebase.auth, email, password);
                navigation.goBack();
            })
            .catch(function() {
                if (email){
                    alert("There is an error in the details", email, password);
                } else {
                    alert("You need to fill in details", email, password);
                }
            })  
    }
    return (
        <KeyboardAvoidingView style={AppStyles.container}
            behavior="padding"
        >
            <View style={AppStyles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={AppStyles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={AppStyles.input}
                    secureTextEntry
                />
            </View>
            <View style={AppStyles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[AppStyles.button, AppStyles.buttonOutline]}>
                    <Text style={AppStyles.buttonOutlineText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

export default SingupScreen;