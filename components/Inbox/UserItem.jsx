import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const UserItem = ({ userInfo }) => {
    return (
        <View>
            <Link href={`/chat?id=${userInfo?.docId}`} className='mt-5'>
                <View className='flex flex-row gap-3 items-center'>
                    <Image source={{ uri: userInfo?.imageUrl }} className='w-[40px] h-[40px] rounded-full' />
                    <Text className='font-pregular text-lg text-white'>{userInfo?.name}</Text>
                </View>
            </Link>
            <View className='border border-gray-600 my-3 w-full'></View>
        </View>
    )
}

export default UserItem