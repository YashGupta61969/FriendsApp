import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Friends = () => {
  return (
    <View>
      <Text style={styles.head}>Your Friends</Text>
      <View>
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
  },
  userName:{
    fontSize:19
  }
})