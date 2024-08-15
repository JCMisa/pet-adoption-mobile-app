import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth, useUser } from '@clerk/clerk-expo'
import { router } from 'expo-router';

const Profile = () => {
    const menu = [
        {
            id: 1,
            name: 'Add New Pet',
            icon: 'add-circle',
            path: '/add-new-pet'
        },
        {
            id: 2,
            name: 'My Posts',
            icon: 'paper-plane',
            path: '/user-post'
        },
        {
            id: 3,
            name: 'Favorites',
            icon: 'heart',
            path: '/(tabs)/favorite'
        },
        {
            id: 4,
            name: 'Inbox',
            icon: 'chatbubble',
            path: '/(tabs)/inbox'
        },
        {
            id: 5,
            name: 'Logout',
            icon: 'exit',
            path: 'logout'
        }
    ]

    const { user } = useUser();
    const { signOut } = useAuth();

    const onPressMenu = (menu) => {
        if (menu.path == 'logout') {
            signOut();
            console.log('logged out sucessfully');
            router.replace('/login')
            return;
        }
        router.push(menu.path)
    }

    return (
        <SafeAreaView className='bg-primary h-full p-7'>
            <Text className='font-pbold text-2xl text-light'>Profile</Text>

            <View className='flex items-center justify-center mt-10 mb-10'>
                <Image source={{ uri: user?.imageUrl }} className='w-[80px] h-[80px] rounded-full' />
                <Text className='font-pbold text-xl mt-2 text-white'>{user?.fullName}</Text>
                <Text className='font-pthin text-xs text-light'>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>

            <FlatList
                data={menu}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => onPressMenu(item)} key={item.id || index}>
                        <View className='my-5 flex flex-row items-center gap-3 bg-black-300 p-7 rounded-lg w-[90%] ml-5'>
                            <Ionicons name={item.icon} size={30} color='#F96D00' className='' />
                            <Text className='font-pregular text-lg text-white'>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={() => (
                    <View>
                        <Text>Empty</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Profile