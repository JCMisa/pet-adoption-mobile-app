import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '@/components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Home = () => {
    return (
        <SafeAreaView className="bg-primary h-full p-3">
            <ScrollView>
                {/* header */}
                <Header />

                {/* slider */}
                <Slider />

                {/* pet list and category */}
                <PetListByCategory />

                {/* add new pet */}
                <TouchableOpacity className='flex flex-row gap-3 items-center p-5 w-[90%] ml-3 mt-5 bg-light-100 border border-light rounded-lg border-dashed justify-center'>
                    <MaterialIcons name="pets" size={24} className="text-primary" />
                    <Text className="text-primary text-lg font-pbold">Add New Pet</Text>
                </TouchableOpacity>
            </ScrollView>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default Home