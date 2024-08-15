import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';

const Header = () => {
    const { user } = useUser();

    return (
        <View className="flex flex-row justify-between items-end">
            <View>
                <Text className="font-pregular text-sm text-light">Welcome 👋</Text>
                <Text className="font-pmedium text-xl text-white">{user ? user?.fullName : 'Unknown'}</Text>
            </View>
            <Image source={{ uri: user ? user?.imageUrl : 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg' }} alt='userImage' className="w-10 h-10 rounded-full" />
        </View>
    )
}

export default Header