import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import PetInfoCard from './PetInfoCard'

const PetSubInfo = ({ pet }) => {
    return (
        <View className='p-7 flex flex-col gap-3'>
            <View className='flex flex-row gap-3'>
                <View className='flex flex-row flex-1 items-center bg-black-100 p-3 rounded-md gap-5'>
                    <Image source={images.calendar} className='w-[40px] h-[40px]' />
                    <View className='flex-1'>
                        <Text className='font-pregular text-xs text-light'>Age</Text>
                        <Text className='font-pmedium text-xl text-white'>{pet?.age}</Text>
                    </View>
                </View>

                <View className='flex flex-row flex-1 items-center bg-black-100 p-3 rounded-md gap-5'>
                    <Image source={images.bone} className='w-[40px] h-[40px]' />
                    <View className='flex-1'>
                        <Text className='font-pregular text-xs text-light'>Breed</Text>
                        <Text className='font-pmedium text-xl text-white'>{pet?.breed}</Text>
                    </View>
                </View>
            </View>

            <View className='flex flex-row gap-3'>
                <View className='flex flex-row flex-1 items-center bg-black-100 p-3 rounded-md gap-5'>
                    <Image source={images.sex} className='w-[40px] h-[40px]' />
                    <View className='flex-1'>
                        <Text className='font-pregular text-xs text-light'>Sex</Text>
                        <Text className='font-pmedium text-xl text-white'>{pet?.sex}</Text>
                    </View>
                </View>

                <View className='flex flex-row flex-1 items-center bg-black-100 p-3 rounded-md gap-5'>
                    <Image source={images.weight} className='w-[40px] h-[40px]' />
                    <View className='flex-1'>
                        <Text className='font-pregular text-xs text-light'>Weight</Text>
                        <Text className='font-pmedium text-xl text-white'>{pet?.weight}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default PetSubInfo