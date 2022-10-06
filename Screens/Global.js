import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,Alert } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Ant from 'react-native-vector-icons/AntDesign'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useEffect } from 'react'
import { useState } from 'react'

const Global = () => {
    const { currentUser, users } = useSelector(state => state.users);
    const [reqsSent, setReqsSent] = useState([])
    const [reqsRecieved, setReqsRecieved] = useState([])
    const [globalUsers, setGlobalUsers] = useState([])
    const [currentUserObject, setCurrentUserObject] = useState({})

    const sendReuest = async (id) => {
        setReqsSent(prev=>[...prev,id])
        try {
            await updateDoc(doc(db, 'users', `/${currentUser.uid}`), {
                requestsSent: arrayUnion(id)
            })
            await updateDoc(doc(db, 'users', `/${id}`), {
                requests: arrayUnion(currentUser.uid)
            })

        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    const aacceptFriendRequest = async (id) => {
        try {
            await updateDoc(doc(db, 'users', `/${currentUser.uid}`), {
                friends: arrayUnion(id)
            })
            await updateDoc(doc(db, 'users', `/${id}`), {
                friends: arrayUnion(currentUser.uid)
            })
            await updateDoc(doc(db, 'users', `/${currentUser.uid}`), {
                requests: arrayRemove(id)
            })
            await updateDoc(doc(db, 'users', `/${id}`), {
                requestsSent: arrayRemove(currentUser.uid)
            })
            setReqsRecieved(prev=>prev.filter(el=>el!==id))
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    useEffect(() => {
        // realtime updates
        const unsub = onSnapshot(doc(db, 'users', currentUser.uid), snapShot => {
            setCurrentUserObject(snapShot.data())

            //get all requests sent
            if (snapShot.data().requestsSent) {
                const sentReqs = users.filter(element => {
                    return snapShot.data().reqsSent && snapShot.data().requestsSent.includes(element.uid)
                })
                setReqsSent(sentReqs)
            }
            
            // get all available requests
            if (snapShot.data().requests) {
                const recievedReqs = users.filter(element => {
                    return snapShot.data().requests && snapShot.data().requests.includes(element.uid)
                })
                setReqsRecieved(recievedReqs)
            }
            // get all users other than the requedsts recieved and friends
        if (users.length > 1) {
            const allUsersOtherThanReqsRecieved = users.filter(element => {

                if(!snapShot.data()?.friends?.includes(element.uid) && !snapShot.data()?.requests?.includes(element.uid) ){
                    return element
                }
            })
            setGlobalUsers(allUsersOtherThanReqsRecieved)
        }

    })

    
        return () => unsub()
    }, [])


    const renderReqsRecieved = ({ item }) => {
        if (item.id !== currentUser.uid) {
            return <View style={styles.user}>
                <View style={styles.userLeft}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
                    />
                    <Text style={styles.userName}>{item.name}</Text>
                </View>

                
                
                <TouchableOpacity onPress={() => aacceptFriendRequest(item.uid)}>
                    <Ant name='plus' size={35} />
             </TouchableOpacity>
                

            </View>
        }
    }

    const renderGlobal = ({ item }) => {
        const tempId = reqsSent.filter(el=>el === item.uid)

        if (item.id !== currentUser.uid) {
            return <View style={styles.user}>
                <View style={styles.userLeft}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: 'https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png' }}
                    />
                    <Text style={styles.userName}>{item.name}</Text>
                </View>
                {
                   tempId.length ? <TouchableOpacity>
                        <Ant name='clockcircleo' size={35} />
                    </TouchableOpacity> :  <TouchableOpacity onPress={() => sendReuest(item.uid)}>
                        <Ant name='adduser' size={35} />
                    </TouchableOpacity>
                }

            </View>
        }
    }

    return (
        <View>
            {
                currentUserObject.requests ? <FlatList
                    data={reqsRecieved}
                    renderItem={renderReqsRecieved}
                    ListHeaderComponent={<Text style={styles.head}>Requests</Text>}
                    ListEmptyComponent={<Text style={styles.emptyText}>No Requests</Text>}
                    /> : null
                }

            {
                globalUsers && <FlatList
                data={globalUsers}
                renderItem={renderGlobal}
                ListHeaderComponent={<Text style={styles.head}>All</Text>}
                ListEmptyComponent={<Text style={styles.emptyText}>No users</Text>}
                />
            }

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
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    }
})