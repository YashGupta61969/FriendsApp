import { View, StatusBar } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Chats from '../Screens/Chats'
import Map from '../Screens/Map'
// import Friends from '../Screens/Friends'
import IonIcons from 'react-native-vector-icons/Ionicons'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
// import Global from '../Screens/Global'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <View style={{paddingTop:StatusBar.currentHeight, flex:1}}>
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarActiveTintColor: '#B12341'
    }}>
      <Tab.Screen name="Chats" component={Chats} options={{tabBarIcon:({color, size})=>(
        <IonIcons name={'chatbubble-ellipses-outline'} color={color} size={size}/>
      )
      }} />
      <Tab.Screen name="Map" component={Map} options={{tabBarIcon:({color, size})=>(
        <Fontisto name={'map-marker-alt'} color={color} size={size}/>
      )}} />
      {/* <Tab.Screen name="Friends" component={Friends} options={{tabBarIcon:({color, size})=>(
        <FontAwesome name={'users'} color={color} size={size}/>
      )}} /> */}
      {/* <Tab.Screen name="Global" component={Global} options={{tabBarIcon:({color, size})=>(
        <FontAwesome name={'globe'} color={color} size={size}/>
      )}} /> */}
    </Tab.Navigator>
    </View>
  )
}

export default TabNavigation