import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

const Chats = () => {
  const { width } = useWindowDimensions()

  return (
    <View style={{...styles.page, width:width-20}}>
      <Text style={styles.head}>Chats</Text>
      <View style={styles.user}>
          {/* image */}
          <Text style={styles.userName}>Yash Gupta</Text>
      </View>
      <View style={styles.user}>
          {/* image */}
          <Text style={styles.userName}>Yash Gupta</Text>
      </View>
      <View style={styles.user}>
          {/* image */}
          <Text style={styles.userName}>Yash Gupta</Text>
      </View>
      <View style={styles.user}>
          {/* image */}
          <Text style={styles.userName}>Yash Gupta</Text>
      </View>
      <View style={styles.user}>
          {/* image */}
          <Text style={styles.userName}>Yash Gupta</Text>
      </View>
    </View>
  )
}

export default Chats

const styles = StyleSheet.create({
  page:{
    flex:1,
    backgroundColor:'#F5F5F5', 
  },
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
    padding: 10,
  },
  userName:{
    fontSize:19
  }
})