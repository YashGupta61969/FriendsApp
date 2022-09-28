import { StyleSheet, Text, View, useWindowDimensions, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import {addUsers, seletUser} from '../redux/slices/usersSlice'

const Chats = ({navigation}) => {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {users, currentUser, selectUser} = useSelector(state=>state.users)

  useEffect(() => {
    // get realtime updates from firebase
    setLoading(true)
    const unsubscribe = onSnapshot(collection(db, 'users'), snapshot => {
      const arr = []
      snapshot.docs.forEach(doc=>{
        arr.push({...doc.data(), id:doc.id})
      })
      dispatch(addUsers(arr))
      setLoading(false)
    })

    return () => {
      unsubscribe()
    }

  }, [])

  useEffect(()=>{
    auth.onAuthStateChanged((loggedIn)=>{
      if(!loggedIn){
        navigation.navigate('Login')
      }
    })
  },[])

  const logOut = ()=>{
      signOut(auth)
      .then(()=>AsyncStorage.clear())
      .catch(err=>alert(err.message))
  }

  const selectUserFn = (item)=>{
    dispatch(seletUser(item))
    navigation.navigate('Chat')
  }

  const renderUser = ({ item }) => {
    // const user = JSON.parse(currentUser)
      if (item.uid !== currentUser.uid) {
      return <TouchableOpacity
       activeOpacity={0.5}
        style={styles.user}
       onPress={()=>selectUserFn(item)}>
        <Image
          style={styles.userImage}
          source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
        />
        <Text style={styles.userName}>{item.name}</Text>
      </TouchableOpacity>
    }
  }

  if(loading){
   return <ActivityIndicator
             animating = {loading}
             color = '#bc2b78'
             size = "large"
             style = {{...styles.activityIndicator, width:width, height, height}}/>
  }

  return (
    <View style={{ ...styles.page, width: width - 20 }}>
      <View style={styles.headWrapper}>

      <Text style={styles.head}>Chats</Text>
      <TouchableOpacity onPress={logOut}>
      <Text style={{fontSize:20}}>Log Out</Text>
      </TouchableOpacity>

      </View>

      <FlatList
        data={users}
        renderItem={renderUser}
        ListEmptyComponent={<Text style={styles.emptyText}>No Users Found</Text>}
      />
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
headWrapper:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop: 20,
  alignItems:'center'
},  
  head: {
    fontSize: 30,
    fontWeight: '500',
    marginLeft: 20
  },
  user: {
    backgroundColor: 'white',
    marginTop: 20,
    marginLeft: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  userName: {
    fontSize: 19,
    marginLeft: 10
  },
  emptyText: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 20
  },
  activityIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 80
 }
})