import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Header from '@/components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '@/components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router'

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
                <TouchableOpacity onPress={() => router.push('/add-new-pet')} className='flex flex-row gap-3 items-end p-5 w-[90%] ml-3 mt-5 bg-secondary-100 border border-secondary rounded-lg border-dashed justify-center'>
                    <Text className="text-primary text-lg font-pbold">Add New Pet</Text>
                </TouchableOpacity>
            </ScrollView>

            <StatusBar backgroundColor="#222831" style="light" />
        </SafeAreaView>
    )
}

export default Home