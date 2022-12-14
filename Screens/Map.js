import { StyleSheet, ActivityIndicator, View, useWindowDimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { doc, updateDoc } from 'firebase/firestore'
import * as Location from 'expo-location';
import { db } from '../firebase/firebase';
import { useSelector } from 'react-redux';

const Map = () => {
  const { width, height } = useWindowDimensions()
  const [location, setLocation] = useState({})
  const [loading, setLoading] = useState(false)
  const { currentUser, users } = useSelector(state => state.users)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Error', 'Permission not Granted')
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        updateDoc(doc(db, 'users', `/${currentUser.uid}`), {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        setLocation(location);
        setLoading(false)
      } catch (error) {
        Alert.alert('Error', error.message)
      }
    })();
  }, []);

  if (loading) {
    return <ActivityIndicator
      animating={loading}
      color='#bc2b78'
      size="large"
      style={{ ...styles.activityIndicator, width: width, height, height }} />
  }

  return (
    <View>
      {location.coords && <MapView style={{ height: height, width: width }} initialRegion={{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>

        {
          users && users.map(user => (
            <Marker key={user.uid} coordinate={{
              latitude: user.latitude,
              longitude: user.longitude
            }}
              pinColor={user.uid === currentUser.uid ? 'red' : 'green'}
              title={user.uid === currentUser.uid ? 'Me' : user.name}
            />
          ))
        }
      </MapView>}
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})