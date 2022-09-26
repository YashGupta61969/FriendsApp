import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Screens/Login'
import SignUp from './Screens/SignUp'
import { Provider } from 'react-redux';
import store from './redux/store'
import Tab from './Navigations/TabNavigation'


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Login' component={Login}
             options={{title:'ososos',headerShown: false}}/>
            
            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Tab'
                component={Tab}
                options={{ headerShown: false }}
            />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
  );
}
