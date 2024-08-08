import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Home/Header'
import Slider from '../../components/Home/Slider'

const Home = () => {
    return (
        <SafeAreaView className="bg-primary h-full p-3">
            <ScrollView>
                {/* header */}
                <Header />

                {/* slider */}
                <Slider />

                {/* category */}

                {/* list of pets */}

                {/* add new pet */}
            </ScrollView>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default Home