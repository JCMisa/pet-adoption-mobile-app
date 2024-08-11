import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const PetInfoCard = ({ pet, moreStyle }) => {
    return (
        <View className={`flex flex-row ${moreStyle} items-center bg-black-100 p-3 rounded-md gap-5`}>
            <Image source={images.calendar} className='w-[40px] h-[40px]' />
            <View>
                <Text className='font-pregular text-xs text-light'>Age</Text>
                <Text className='font-pmedium text-xl text-white'>{pet?.age}</Text>
            </View>
        </View>
    )
}

export default PetInfoCard