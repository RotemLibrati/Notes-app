import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SingupScreen from './screens/SingupScreen';
import NoteScreen from './screens/NoteScreen';
import Map from './components/Location/Map';
import { Foundation, Feather } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();

function MainAppScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" component={SingupScreen} options={{ title: 'Create New User' }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Main' }} />
      <Stack.Screen name="NoteScreen" component={NoteScreen} options={{ title: 'Note' }} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen name='Notes' component={MainAppScreen} options={{
          tabBarIcon: ({ focused }) => {
            return (<Foundation name="clipboard-notes" size={30} color={focused ? 'blue' : 'black'} />);
          },
        }} />
        <Tab.Screen name='Map' component={Map} options={{
          tabBarIcon: ({ focused }) => {
            return (<Feather name="map-pin" size={30} color={focused ? 'blue' : 'black'} />);
          },
        }} />
      </Tab.Navigator>
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
