import React, { useState, useEffect } from 'react'
import {signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { addCurrentUser } from '../redux/slices/usersSlice'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const { width } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = async ()=>{
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      await AsyncStorage.setItem('user', JSON.stringify(user.user))
      dispatch(addCurrentUser(user.user))
      navigation.navigate('Tab') 
    } catch (error) {
      Alert.alert('Error', error.message)
    }
    
  }

  useEffect(()=>{
    const getUser = async()=>{
      const user = await AsyncStorage.getItem('user');
      if(user){
        const data = JSON.parse(user)
        dispatch(addCurrentUser(data))
        if(data){
          navigation.navigate('Tab')
        }
      }
    }
    getUser()
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.head}>Hey,</Text>
        <Text style={styles.head}>Login Now.</Text>
      </View>

      <View style={{ ...styles.inputWrapper, width: width - 20 }}>
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setEmail(txt)}
          placeholder='Email'
          value={email}
          autoCapitalize={'none'}
        />
        <TextInput
          style={styles.input}
          onChangeText={(txt) => setPassword(txt)}
          placeholder='Password'
          value={password}
          autoCapitalize={'none'}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={login}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Don't Have an Account?  <Text onPress={()=>navigation.navigate('SignUp')} style={{color:'black'}}>Sign Up</Text> </Text>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  navText:{
    alignSelf:'center',
    marginTop:10,
    color:'#C0C0CB',
    fontSize:15
  }
})