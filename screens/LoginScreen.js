import React, { useState, useEffect } from 'react';
import { Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AppStyles } from '../components/styles/AppStyles';


const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const CreateNewUser = () => {
        navigation.navigate("SignupScreen");
    };
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("MainScreen");
            }
        })
        return unsubscribe;
    }, []);

    const handleLogin = () => {
        signInWithEmailAndPassword(firebase.auth, email.replace(' ', ''), password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Logged in with: ', user.email);
                navigation.navigate("MainScreen");
            })
            .catch(error => alert("Email or password incorrect", email, password));
    };


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
                    onPress={handleLogin}
                    style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={CreateNewUser}
                    style={[AppStyles.button, AppStyles.buttonOutline]}>
                    <Text style={AppStyles.buttonOutlineText}>Signup</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;
