import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className='flex justify-center items-center px-4 max-h-[160px]'>
            <Image source={images.empty} className='w-[270px] max-h-[120px]' resizeMode='contain' />

            <Text className="text-sm text-center font-psemibold text-white">
                {title}
            </Text>
            <Text className="font-pmedium text-xs text-light">
                {subtitle}
            </Text>

            {/* <CustomButton title={'Create video'} handlePress={() => router.push('/create')} containerStyles={'w-full my-5'} /> */}
        </View>
    )
}

export default EmptyState