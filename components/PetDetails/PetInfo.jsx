import { View, Text, Image } from 'react-native'
import React from 'react'
import MarkFav from '../MarkFav'

const PetInfo = ({ pet }) => {
    return (
        <View>
            <Image source={{ uri: pet?.imageUrl }} className='w-full h-[400px] bg-cover' />

            <View className='p-7 flex flex-row justify-between items-center'>
                <View>
                    <Text className='font-pbold text-xl text-white'>{pet?.name}</Text>
                    <Text className='font-pregular text-xs text-light max-w-[200px]'>{pet?.address}</Text>
                </View>

                <MarkFav pet={pet} />
            </View>
        </View>
    )
}

export default PetInfo