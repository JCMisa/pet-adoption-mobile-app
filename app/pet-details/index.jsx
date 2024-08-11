import { View, Text, SafeAreaView, ScrollView } from 'react-native'
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
            </ScrollView>

            {/* adopt button */}
        </SafeAreaView>
    )
}

export default PetDetails