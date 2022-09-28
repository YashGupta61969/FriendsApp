import { StyleSheet, Text, View, Image, StatusBar, TextInput, FlatList,TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Mui from 'react-native-vector-icons/MaterialCommunityIcons'
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Chat = () => {
  const {selectedUser, currentUser} = useSelector(state=>state.users)
  const [messages, setMessages] = useState([])
  const [textMessage, setTextMessage] = useState('')

  useEffect(()=>{
    const id = currentUser.uid > selectedUser.uid ? `${currentUser.uid + selectedUser.uid}` : `${selectedUser.uid + currentUser.uid}`;
    const refrenceQuery = query(collection(db, 'messages', id, 'chat'), orderBy('createdAt', 'desc'))

    // Fetch realtime Messages
    onSnapshot(refrenceQuery, snapshot=>{
      let msgs = [];
      snapshot.forEach(doc=>{
        msgs.push(doc.data())
      })
      setMessages(msgs)
    })
    
  },[selectedUser])

  const sendMessage = async()=>{

    try {
    // send texts to other user
    if(textMessage){
      const id = currentUser.uid > selectedUser.uid ? `${currentUser.uid + selectedUser.uid}` : `${selectedUser.uid + currentUser.uid}`;
      await addDoc(collection(db, 'messages', id, 'chat'),{
        text:textMessage || "",
        from: currentUser.uid,
          to:selectedUser.uid,
          createdAt: Timestamp.fromDate(new Date()),
        })
        setTextMessage('')
    }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
       
  }


  const renderMessages = ({item})=>{
    return <Text style={item.from === currentUser.uid ? styles.messageSent : styles.messageRecieved}>{item.text}</Text>
  }

  return (
    <View style={styles.page}>

{/* Navbar */}
      <View
        style={styles.user}>
        <Image
          style={styles.userImage}
          source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
        />
        <Text style={styles.userName}>Yash</Text>
      </View>

      {/* Message Section */}

      <FlatList
      contentContainerStyle={{flexDirection:'column-reverse'}}
      data={messages}
      renderItem={renderMessages}
      />

      {/* Text Input To send Messgaes */}

      <View style={styles.inputWrapper}>
      <TextInput
          style={styles.input}
          onChangeText={(txt) => setTextMessage(txt)}
          placeholder='Type Here'
          value={textMessage}
          autoCapitalize={'none'}
        />
        <TouchableOpacity
        activeOpacity={0.5}
        onPress={sendMessage}
        style={styles.btn}>
            <Mui name='send' style={styles.btnIcon} size={40}/>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: StatusBar.currentHeight -10,
  },
  user: {
    // backgroundColor: 'white',
    marginTop: 20,
    paddingLeft: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  userName: {
    fontSize: 19,
    marginLeft: 20
  },
messageSent:{
  backgroundColor:'#B12341',
  color:'white',
  marginTop:8,
  marginRight:18,
  alignSelf:'flex-end',
  paddingVertical:10,
  paddingHorizontal:20,
  borderRadius:7,
  fontSize:16,
  maxWidth:'80%'
},
messageRecieved:{
  backgroundColor:'white',
  marginTop:8,
  marginLeft:18,
  alignSelf:'flex-start',
  paddingVertical:10,
  paddingHorizontal:20,
  borderRadius:7,
  maxWidth:'80%'
},
  inputWrapper:{
    marginTop:5,
    flexDirection:'row',
    backgroundColor: '#FFF',
  },
  input:{
    width: '80%',
    borderRadius: 10,
    paddingLeft: 20,
    paddingVertical: 20,
    // marginTop: 30,
    fontSize: 18
  },
  btn:{
    width:'20%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8
  },
  btnIcon:{
    color:'#B12341',
  }
})