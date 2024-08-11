import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'

const AboutPet = ({ pet }) => {
    const [readMore, setReadMore] = useState(false)
    return (
        <View className='p-7'>
            <Text className='font-pmedium text-lg text-white'>About {pet?.name}</Text>
            <Text numberOfLines={readMore ? 100 : 3} className='font-pregular text-xs text-light'>
                {pet?.about}
            </Text>
            {readMore ? (
                <Pressable onPress={() => setReadMore(false)}>
                    <Text className='font-pmedium text-xs text-secondary'>
                        Read Less
                    </Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => setReadMore(true)}>
                    <Text className='font-pmedium text-xs text-secondary'>
                        Read More
                    </Text>
                </Pressable>
            )}

        </View>
    )
}

export default AboutPet