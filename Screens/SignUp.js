import { StatusBar, View, Text, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase/firebase'
import { useDispatch } from 'react-redux'
import { addCurrentUser } from '../redux/slices/usersSlice'
import { doc, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const signUp = () => {
    if (!name.trim()) {
      return Alert.alert('Error 404', 'Name Not Found')
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(data => {
        AsyncStorage.setItem('user', JSON.stringify(data.user))
        dispatch(addCurrentUser(data.user))
        setDoc(doc(db, 'users', data.user.uid), {
          uid: data.user.uid,
          email,
          name,
        })
        navigation.navigate('Tab')
      })
      .catch(err => Alert.alert("Error", err.message))
  }

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
        <TouchableOpacity style={styles.btn} activeOpacity={0.8} onPress={signUp}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Already A User  <Text onPress={() => navigation.navigate('Login')} style={{ color: 'black' }}>Log In</Text> </Text>
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
  iconWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    justifySelf: 'flex-end'
  },
  icon: {
    marginHorizontal: 20
  }
})