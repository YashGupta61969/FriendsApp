import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './TabNavigation'
import Chat from '../Screens/Chat';


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
  return (
   <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
             name='Login'
              component={Login}
             />
            <Stack.Screen
                name='SignUp'
                component={SignUp}
            />
            <Stack.Screen
                name='Tab'
                component={Tab}
            />
            <Stack.Screen
                name='Chat'
                component={Chat}
            />
            </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})