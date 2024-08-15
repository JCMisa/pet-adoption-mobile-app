import { View, Text, Image, Pressable, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import { images } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as WebBrowser from 'expo-web-browser'
import { Link, router } from 'expo-router'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export const useWarmUpBrowser = () => {
    React.useEffect(() => {
        // Warm up the android browser to improve UX
        // https://docs.expo.dev/guides/authentication/#improving-user-experience
        void WebBrowser.warmUpAsync()
        return () => {
            void WebBrowser.coolDownAsync()
        }
    }, [])
}
WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

    const onPress = useCallback(async () => {
        console.log('button pressed')
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
            })

            if (createdSessionId) {
                setActive({ session: createdSessionId })
            } else {
                // Use signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error('OAuth error', err)
        }
    }, [])

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <Image source={images.login} className="w-full h-[500px]" />

                <View className="p-20 flex items-center">
                    <Text className="font-pbold text-lg text-center text-white">Ready to make a new friend?</Text>
                    <Text className="font-pregular text-sm text-center text-light">
                        Let's adopt the pet which you like and make their lives happy again
                    </Text>

                    <Pressable onPress={onPress} className="p-4 mt-10 bg-secondary-100 w-full border rounded-lg">
                        <Text className="font-pmedium text-lg text-center">Get Started</Text>
                    </Pressable>
                    <Pressable onPress={() => router.push('/(tabs)/home')}>
                        <Text className="font-pmedium text-sm text-white mt-3 text-center">Go Home</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default LoginScreen