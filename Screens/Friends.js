import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useState } from 'react'


const Friends = () => {
  const {currentUser, users} = useSelector(state=>state.users)
  const [friends, setFriends] = useState([])

  useEffect(()=>{
    const refrenceCollection = doc(db,'users',currentUser.uid)

    const unsub = onSnapshot(refrenceCollection, snapshot=>{
      setFriends(users.filter(element=> snapshot.data().friends.includes(element.uid)))
    })

    return ()=>{
      unsub()
    }
  },[])

  const renderUser = ({ item }) => {
    if (item.id !== currentUser.uid) {
      return <View style={styles.user}>
        <Image
          style={styles.userImage}
          source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
        />
        <Text style={styles.userName}>{item.name}</Text>
      </View>
    }
  }

  return (
    <View>
      <Text style={styles.head}>Friends</Text>
      <FlatList
      data={friends}
      renderItem={renderUser}
      ListEmptyComponent={<Text style={styles.emptyText}>No Friends Found</Text>}
      />
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  head:{
    fontSize:30,
    fontWeight:'500',
    marginTop:20,
    marginLeft:20
  },
  user:{
    backgroundColor:'white',
    marginTop:20,
    marginLeft:20,
    marginRight:20,
    padding: 10,
    flexDirection:'row',
    alignItems:'center',
    borderRadius:10
  },
  userImage:{
    width:50,
       height:50,
        borderRadius:50/2
  },
  userName:{
    fontSize:19,
    marginLeft:10
  }
})