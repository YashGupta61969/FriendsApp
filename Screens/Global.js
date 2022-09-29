import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Ant from 'react-native-vector-icons/AntDesign'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'

const Global = () => {
    const { currentUser, users } = useSelector(state => state.users);

    const addFriend = async (id) => {
        try {
           await updateDoc(doc(db, 'users', `/${currentUser.uid}`), {
                requestsSent: [id]
            })
            await updateDoc(doc(db, 'users', `/${id}`), {
                requests: [currentUser.uid]
            })
            
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const renderUser = ({ item }) => {
        if (item.id !== currentUser.uid) {
            return <View style={styles.user}>
                <View style={styles.userLeft}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
                    />
                    <Text style={styles.userName}>{item.name}</Text>
                </View>
                <TouchableOpacity onPress={() => addFriend(item.uid)}>
                    <Ant name='adduser' size={35} />
                </TouchableOpacity>


            </View>
        }
    }

    return (
        <View>
            <Text style={styles.head}>Add Friends</Text>
            <FlatList
                data={users}
                renderItem={renderUser}
                ListEmptyComponent={<Text style={styles.emptyText}>No Users Found</Text>}
            />
        </View>
    )
}

export default Global


const styles = StyleSheet.create({
    head: {
        fontSize: 30,
        fontWeight: '500',
        marginTop: 20,
        marginLeft: 20
    },
    user: {
        backgroundColor: 'white',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'space-between'
    },
    userLeft: {
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
        marginLeft: 10,
        //   width:'60%'
    }
})