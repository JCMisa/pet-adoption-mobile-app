import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '@/components/Home/PetListByCategory'

const Home = () => {
    return (
        <SafeAreaView className="bg-primary h-full p-3">
            <View>
                {/* header */}
                <Header />

                {/* slider */}
                <Slider />

                {/* pet list and category */}
                <PetListByCategory />

                {/* add new pet */}
            </View>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default Home