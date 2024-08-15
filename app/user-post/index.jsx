import { View, Text, FlatList, RefreshControl, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from '@/components/Home/PetListItem';
import EmptyState from '@/components/Helpers/EmptyState';
import Ionicons from '@expo/vector-icons/Ionicons';

const UserPost = () => {
    const navigation = useNavigation();
    const { user } = useUser();

    const [userPosts, setUserPosts] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: false,
            headerTitle: 'My Posts',
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#222831'
            }
        })

        user && getUserPost();
    }, [user])

    const getUserPost = async () => {
        setUserPosts([]);
        const q = query(collection(db, 'Pets'), where('user.email', '==', user?.primaryEmailAddress?.emailAddress))
        const result = await getDocs(q);
        result.forEach((res) => {
            console.log("User Post: ", res.id, " => ", res.data());
            setUserPosts(userPosts => [...userPosts, res.data()]);
        })
    }

    const onRefresh = async () => {
        setRefreshing(true)
        await getUserPost(); // get the data again
        setRefreshing(false)
    }

    const deletePetModal = async (petId) => {
        Alert.alert('Are you absolutely sure?', 'This action is permanent and will cause changes on your data.', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel deletion'),
                style: 'cancel'
            },
            {
                text: 'Delete',
                onPress: () => deletePost(petId),
                style: 'destructive'
            }
        ])
    }

    const deletePost = async (petId) => {
        await deleteDoc(doc(db, 'Pets', petId)); // used to delete the post
        await getUserPost();
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={userPosts}
                keyExtractor={(item, index) => item?.id || index}
                renderItem={({ item, index }) => (
                    <View className='ml-4 my-5'>
                        <PetListItem info={item} />
                        <Pressable onPress={() => deletePetModal(item.id)} className='p-3 bg-red-500 rounded-lg mt-2 w-36 flex items-center justify-center flex-row'>
                            <Ionicons name="trash" size={12} color="white" />
                            <Text className='text-white font-pbold ml-2'>Delete</Text>
                        </Pressable>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState title="No Posts to Show" subtitle="Please wait while we are fetching the data" />
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                numColumns={2}
            />
        </SafeAreaView>
    )
}

export default UserPost