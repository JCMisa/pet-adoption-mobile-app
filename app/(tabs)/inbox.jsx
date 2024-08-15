import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserItem from '@/components/Inbox/UserItem'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '@/components/Helpers/EmptyState'

const Inbox = () => {
    const { user } = useUser();

    const [userList, setUserList] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        user && getUserList();
    }, [user])

    // get the user list depends on current user email
    const getUserList = async () => {
        setUserList([])
        const q = query(collection(db, 'Chat'), where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserList(prevList => [...prevList, doc.data()])
        })
    }

    // filter the list of other users in one state
    const mapOtherUserList = () => {
        const list = [];
        userList.forEach((record) => {
            console.log("user record: ", record);
            const otherUser = record.users?.filter(user => user?.email != user?.primaryEmailAddress?.emailAddress);
            console.log("other users: ", otherUser);

            const result = {
                docId: record?.id,
                ...otherUser[1] // because the other user is located in second element which is index 1
            }
            list.push(result);
        })

        return list;
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getUserList(); // get the data again
        setRefreshing(false)
    }

    return (
        <SafeAreaView className='py-12 px-5 bg-primary h-full'>
            <Text className='font-pbold text-2xl text-light'>Inbox</Text>

            <FlatList
                data={mapOtherUserList()}
                keyExtractor={(item, index) => item?.docId || index}
                renderItem={({ item, index }) => (
                    <View key={index}>
                        <UserItem userInfo={item} />
                        {console.log(item)}
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Messages to Show" subtitle="Please wait while we are fetching the data" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                className='mt-3'
            />
        </SafeAreaView>
    )
}

export default Inbox