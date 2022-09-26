import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chat from '../Screens/Chats'
import Map from '../Screens/Map'
import Friends from '../Screens/Friends'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Friends" component={Friends} />
    </Tab.Navigator>
  )
}

export default TabNavigation