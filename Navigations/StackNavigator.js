import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../Screens/Login'
import SignUp from '../Screens/SignUp'
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tab from './TabNavigation'


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const {currentUser} = useSelector(state=>state.users)
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
            </Stack.Navigator>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})