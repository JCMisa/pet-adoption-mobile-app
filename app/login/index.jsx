import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const LoginScreen = () => {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <Image source={images.login} className="w-full h-[500px]" />

                <View className="p-20 flex items-center">
                    <Text className="font-pbold text-lg text-center text-light">Ready to make a new friend?</Text>
                    <Text className="font-pregular text-sm text-center text-light-100">
                        Let's adopt the pet which you like and make their lives happy again
                    </Text>

                    <Pressable className="p-4 mt-10 bg-secondary-100 w-full border rounded-lg">
                        <Text className="font-pmedium text-lg text-center">Get Started</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default LoginScreen