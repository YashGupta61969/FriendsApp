import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

const Map = () => {
  const { width, height } = useWindowDimensions()

  return (
    <View>
      <MapView style={{height:height, width:width}}/>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    
  }
})