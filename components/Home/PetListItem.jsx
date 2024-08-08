import { View, Text, Image } from 'react-native'
import React from 'react'

const PetListItem = ({ info }) => {
    return (
        <View className='p-3 mr-5 bg-gray-700 rounded-lg shadow border border-black-200 max-w-[176px] overflow-hidden'>
            <Image source={{ uri: info?.imageUrl }} className='w-[150px] h-[135px] object-cover rounded-lg shadow' />
            <Text className='font-pmedium text-lg text-light'>{info?.name}</Text>
            <View className='flex flex-row justify-between items-center'>
                <Text className="font-pregular text-gray-400 text-xs">
                    {info?.breed.slice(0, 10)}{info?.breed.length > 10 ? "..." : info?.breed.slice(11, info?.breed.length)}
                </Text>
                <Text className="font-pregular text-secondary bg-light px-2 py-2 text-sm rounded-lg">
                    {info?.age} years
                </Text>
            </View>
        </View>
    )
}

export default PetListItem