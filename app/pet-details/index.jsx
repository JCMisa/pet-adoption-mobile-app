import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PetInfo from '@/components/PetDetails/PetInfo';
import PetSubInfo from '@/components/PetDetails/PetSubInfo';

const PetDetails = () => {
    const pet = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    return (
        <View className='bg-black-200 h-full'>
            {/* pet info */}
            <PetInfo pet={pet} />

            {/* pet subinfo */}
            <PetSubInfo pet={pet} />

            {/* about */}

            {/* owner details */}

            {/* adopt button */}
        </View>
    )
}

export default PetDetails