import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';
import AboutPet from '@/components/PetDetails/AboutPet';
import OwnerInfo from '@/components/PetDetails/OwnerInfo';

const PetDetails = () => {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: '',
            headerTintColor: 'white'
        })
    }, [])

    return (
        <SafeAreaView className='bg-black-200 h-full'>
            <ScrollView>
                {/* pet info */}
                <PetInfo pet={pet} />

                {/* pet subinfo */}
                <PetSubInfo pet={pet} />

                {/* about */}
                <AboutPet pet={pet} />

                {/* owner details */}
                <OwnerInfo pet={pet} />
                <View className='h-28'></View>
            </ScrollView>

            {/* adopt button */}
            <View className='absolute w-full bottom-0'>
                <TouchableOpacity className='p-5 bg-secondary'>
                    <Text className='text-center font-pmedium text-lg text-white'>
                        Adopt Me
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default PetDetails