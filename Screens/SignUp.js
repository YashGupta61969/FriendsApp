import { StatusBar, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Ant from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import {useDispatch} from 'react-redux'
import { addCurrentUser } from '../redux/slices/usersSlice'
import { doc, setDoc, Timestamp } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react'

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const signUp = ()=>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(data=>{
      AsyncStorage.setItem('user', JSON.stringify(data.user))
      dispatch(addCurrentUser(JSON.stringify(data.user)))
      setDoc(doc(db, 'users', data.user.uid ),{
        uid:data.user.uid,
        email,
        name,
        createdAt:Timestamp.fromDate(new Date())
      })
      navigation.navigate('Tab')
    })
    .catch(err=>Alert.alert("Error", err.message))
  }

  useEffect(()=>{
    const getUser = async()=>{
      const user = await AsyncStorage.getItem('user');
      dispatch(addCurrentUser(user))
      const data = JSON.parse(user)
      if(data){
        navigation.navigate('Tab')
      }
    }
    getUser()
  },[])
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>Hey,</Text>
        <Text style={styles.head}>Sign Up Now.</Text>
      </View>
      <View style={{ ...styles.inputWrapper, width: width - 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setName(txt)}
          placeholder='Name'
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setEmail(txt)}
          placeholder='Email'
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setPassword(txt)}
          placeholder='Password'
          value={password}
        />
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={signUp}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Already A User  <Text onPress={() => navigation.navigate('Login')} style={{ color: 'black' }}>Log In</Text> </Text>
      <Text style={{...styles.navText, marginTop:20}}>Or Sign Up With</Text>
        <View style={{...styles.iconWrapper, width:width-20}}>
          <Ant name='google' style={styles.icon} size={50}/>
          <Entypo name='facebook' style={styles.icon} size={50}/>
        </View>
      </View>

    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  head: {
    alignItems: 'center',
    fontSize: 35,
    fontWeight: '600',
    marginLeft: 20
  },
  inputWrapper: {
    alignSelf: 'center'
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingLeft: 20,
    paddingVertical: 20,
    marginTop: 30,
    fontSize: 18
  },
  btn: {
    backgroundColor: '#B12341',
    paddingVertical: 20,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center'
  },
  btnText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '500'
  },
  navText: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#C0C0CB',
    fontSize: 15
  },
  iconWrapper:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:18,
    justifySelf:'flex-end'
  },
  icon:{
    marginHorizontal:20
  }
})