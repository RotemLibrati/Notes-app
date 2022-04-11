import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SingupScreen from './screens/SingupScreen';
import NoteScreen from './screens/NoteScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignupScreen" component={SingupScreen} options={{ title: 'Create New User'}} />
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Main'}}/>
        <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ title: 'Create New Note'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
